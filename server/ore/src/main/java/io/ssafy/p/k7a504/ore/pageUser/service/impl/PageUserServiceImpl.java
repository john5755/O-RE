package io.ssafy.p.k7a504.ore.pageUser.service.impl;

import io.ssafy.p.k7a504.ore.common.exception.CustomException;
import io.ssafy.p.k7a504.ore.common.exception.ErrorCode;
import io.ssafy.p.k7a504.ore.common.security.SecurityUtil;
import io.ssafy.p.k7a504.ore.page.domain.Page;
import io.ssafy.p.k7a504.ore.page.repository.PageRepository;
import io.ssafy.p.k7a504.ore.pageUser.domain.PageUser;
import io.ssafy.p.k7a504.ore.pageUser.domain.PageUserRole;
import io.ssafy.p.k7a504.ore.pageUser.dto.*;
import io.ssafy.p.k7a504.ore.pageUser.repository.PageUserRepository;
import io.ssafy.p.k7a504.ore.pageUser.service.PageUserService;
import io.ssafy.p.k7a504.ore.teamUser.repository.TeamUserRepository;
import io.ssafy.p.k7a504.ore.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class PageUserServiceImpl implements PageUserService {

    final private PageUserRepository pageUserRepository;
    final private TeamUserRepository teamUserRepository;
    final private PageRepository pageRepository;

    @Override
    public PageUserResponseDto getPageUser(Long pageUserId){
        PageUser pageUser = pageUserRepository.findById(pageUserId)
                .orElseThrow(() -> new CustomException(ErrorCode.PAGE_USER_NOT_FOUND));
        return  PageUserResponseDto.createDto(pageUser);
    }

    @Override
    public Slice<PageUserResponseDto> getPageUserList(Long pageId, Pageable pageable) {
        Slice<PageUser> pageUserList = pageUserRepository.findAllByPageId(pageId, pageable);
        if(pageUserList.getSize()==0){
            throw new CustomException(ErrorCode.PAGE_NOT_FOUND);
        }
        return pageUserList.map(PageUserResponseDto::new);
    }

    @Override
    @Transactional
    public Long changeAuth(PageUserModifyAuthRequestDto pageUserModifyAuthRequestDto) {
        Long pageId = pageUserModifyAuthRequestDto.getPageId();
        Long fromUserId = SecurityUtil.getCurrentUserId();
        PageUser fromPageUser = pageUserRepository.findByPageIdAndUserId(pageId, fromUserId)
                .orElseThrow(() -> new CustomException(ErrorCode.PAGE_USER_NOT_FOUND));

        HashMap<Long, PageUserRole> userRoleMapList = pageUserModifyAuthRequestDto.getUserRoleMapList();
        List<Long> toUserIdList = new ArrayList<>();
        userRoleMapList.keySet().iterator().forEachRemaining(toUserIdList::add);

        for(int i=0; i<toUserIdList.size(); i++){
            Long toPageUserId = toUserIdList.get(i);
            PageUser toPageUser = pageUserRepository.findById(toPageUserId)
                    .orElseThrow(() -> new CustomException(ErrorCode.PAGE_USER_NOT_FOUND));
            fromPageUser.grantRole(toPageUser, pageUserModifyAuthRequestDto.getUserRoleMapList().get(toPageUserId));
            pageUserRepository.save(toPageUser);
        }
        return fromUserId;
    }

    @Override
    @Transactional
    public Long invitePageUser(PageUserInviteRequestDto pageUserInviteDto){
        Long pageId = pageUserInviteDto.getPageId();
        List<Long> userIdList = pageUserInviteDto.getUserIdList();
        Page page = pageRepository.findById(pageId)
                .orElseThrow(() -> new CustomException(ErrorCode.PAGE_NOT_FOUND));
        Long fromUserId = SecurityUtil.getCurrentUserId();
        PageUser fromPageUser = pageUserRepository.findByPageIdAndUserId(pageId, fromUserId)
                .orElseThrow(() -> new CustomException(ErrorCode.PAGE_USER_NOT_FOUND));
        if(fromPageUser.getPageUserRole().equals(PageUserRole.VIEWER)){
            throw new CustomException(ErrorCode.NO_AUTH_TO_INVITE);
        }

        if(pageUserRepository.countByPageIdAndUserId(pageId, userIdList)!=0){
            throw  new CustomException(ErrorCode.DUPLICATE_PAGE_USER);
        }

        List<PageUser> newPageUserList= new ArrayList<>();
        for(int i = 0; i<userIdList.size(); i++){
            Long toUserId = userIdList.get(i);
            User toUser = teamUserRepository.findByUserIdAndTeamId(toUserId, page.getTeam().getId())
                    .orElseThrow(() -> new CustomException(ErrorCode.TEAM_USER_NOT_FOUND)).getUser();

            newPageUserList.add(PageUser.enrollPage(page, toUser));
        }
        pageUserRepository.saveAll(newPageUserList);
        return fromUserId;
    }

    @Override
    @Transactional
    public Long leavePageUser(Long pageId) {
        Long userId = SecurityUtil.getCurrentUserId();
        PageUser pageUser = pageUserRepository.findByPageIdAndUserId(pageId, userId)
                .orElseThrow(() -> new CustomException(ErrorCode.PAGE_USER_NOT_FOUND));
        pageUserRepository.deleteById(pageUser.getId());
        deleteEmptyPage(pageId);
        return pageUser.getId();
    }

    @Override
    @Transactional
    public Long deletePageUser(PageUserDeleteRequestDto pageUserDeleteRequestDto) {
        Long fromUserId = SecurityUtil.getCurrentUserId();
        Long pageId = pageUserDeleteRequestDto.getPageId();
        List<Long> pageUserIdList = pageUserDeleteRequestDto.getPageUserIdList();
        PageUser fromPageUser = pageUserRepository.findByPageIdAndUserId(pageId,fromUserId)
                .orElseThrow(() -> new CustomException(ErrorCode.PAGE_USER_NOT_FOUND));
        int fromUserRole = fromPageUser.getPageUserRole().getPriority();
        if(pageUserRepository.countById(pageUserIdList)!=pageUserIdList.size()){
            throw new CustomException(ErrorCode.PAGE_USER_NOT_FOUND);
        }
        switch(fromUserRole) {
            case 1:
                throw new CustomException(ErrorCode.NO_AUTH_TO_DELETE);
            case 2:
                if(pageUserRepository.countByIdAndPageUserRole(pageUserIdList,PageUserRole.VIEWER )!=pageUserIdList.size()){
                    throw new CustomException(ErrorCode.NO_AUTH_TO_DELETE);
                }
                break;
            case 3:
                if(pageUserRepository.countByIdAndPageUserRole(pageUserIdList,PageUserRole.MAINTAINER )!=0){
                    throw new CustomException(ErrorCode.NO_AUTH_TO_DELETE);
                }
                break;
        }
        pageUserRepository.deleteAllById(pageUserIdList);
        deleteEmptyPage(pageId);
        return fromUserId;
    }

    public void deleteEmptyPage(Long pageId){
        if(pageUserRepository.countByPageId(pageId)==0){
            pageRepository.deleteById(pageId);
        }
    }

    @Override
    public Slice<PageOfTeamResponseDto> pageOfTeam(Long teamId, Pageable pageable) {
        if(!teamUserRepository.existsById(teamId)){
            throw new CustomException(ErrorCode.TEAM_NOT_FOUND);
        }
        Long userId = SecurityUtil.getCurrentUserId();
        Slice<PageUser> pageUserList = pageUserRepository.findByTeamIdAndUserId(teamId,userId, pageable);
        return pageUserList.map(PageOfTeamResponseDto::new);
    }

    @Override
    public Slice<PageUserResponseDto> findPageUserByName(Long pageId, String name, Pageable pageable) {
        if(!pageRepository.existsById(pageId)){
            throw new CustomException(ErrorCode.PAGE_NOT_FOUND);
        }
        Slice<PageUser> pageUserList = pageUserRepository.findAllByUserName(pageId, name, pageable);
        return pageUserList.map(PageUserResponseDto::new);
    }

    @Override
    public Slice<PageUserResponseDto> findPageUserByNickame(Long pageId, String nickName, Pageable pageable) {
        if(!pageRepository.existsById(pageId)){
            throw new CustomException(ErrorCode.PAGE_NOT_FOUND);
        }
        Slice<PageUser> pageUserList = pageUserRepository.findAllByNickName(pageId, nickName, pageable);
        return pageUserList.map(PageUserResponseDto::new);
    }
}
