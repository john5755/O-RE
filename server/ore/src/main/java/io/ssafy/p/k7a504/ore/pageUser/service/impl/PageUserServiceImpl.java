package io.ssafy.p.k7a504.ore.pageUser.service.impl;

import io.ssafy.p.k7a504.ore.common.exception.CustomException;
import io.ssafy.p.k7a504.ore.common.exception.ErrorCode;
import io.ssafy.p.k7a504.ore.common.security.SecurityUtil;
import io.ssafy.p.k7a504.ore.page.domain.Page;
import io.ssafy.p.k7a504.ore.page.repository.PageRepository;
import io.ssafy.p.k7a504.ore.pageUser.domain.PageUser;
import io.ssafy.p.k7a504.ore.pageUser.domain.PageUserRole;
import io.ssafy.p.k7a504.ore.pageUser.dto.PageUserDeleteRequestDto;
import io.ssafy.p.k7a504.ore.pageUser.dto.PageUserInviteRequestDto;
import io.ssafy.p.k7a504.ore.pageUser.dto.PageUserModifyAuthRequestDto;
import io.ssafy.p.k7a504.ore.pageUser.dto.PageUserResponseDto;
import io.ssafy.p.k7a504.ore.pageUser.repository.PageUserRepository;
import io.ssafy.p.k7a504.ore.pageUser.service.PageUserService;
import io.ssafy.p.k7a504.ore.teamUser.repository.TeamUserRepository;
import io.ssafy.p.k7a504.ore.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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
        //todo : dto에서 create로해서 여기서 쓰기
        return  PageUserResponseDto.builder().pageUser(pageUser).build();
    }

    @Override
    public List<PageUserResponseDto> getPageUserList(Long pageId) {
        //todo : 페이지네이션
        List<PageUser> pageUserList = pageUserRepository.findAllByPageId(pageId);

        if(pageUserList.size()==0){
            throw new CustomException(ErrorCode.PAGE_NOT_FOUND);
        }

        return pageUserList.stream().map(PageUserResponseDto::new).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public Long changeAuth(List<PageUserModifyAuthRequestDto> pageUserModifyAuthRequestDto) {
        Long fromUserId = SecurityUtil.getCurrentUserId();
        //todo: for문안에서 쿼리 그만...
        for(int i=0; i<pageUserModifyAuthRequestDto.size(); i++){
            Long toPageUserId = pageUserModifyAuthRequestDto.get(i).getPageUserId();
            PageUser toPageUser = pageUserRepository.findById(toPageUserId)
                    .orElseThrow(() -> new CustomException(ErrorCode.PAGE_USER_NOT_FOUND));

            Long pageId = toPageUser.getPage().getId();

            PageUser fromPageUser = pageUserRepository.findByPageIdAndUserId(pageId, fromUserId)
                    .orElseThrow(() -> new CustomException(ErrorCode.PAGE_USER_NOT_FOUND));
            fromPageUser.grantRole(toPageUser, pageUserModifyAuthRequestDto.get(i).getPageUserRole());

            pageUserRepository.save(toPageUser);
        }
        return fromUserId;
    }

    @Override
    @Transactional
    public Long invitePageUser(PageUserInviteRequestDto pageUserInviteDto){
        //todo : for문안에 쿼리좀 그만... saveAll로 처리하자
        Long pageId = pageUserInviteDto.getPageId();
        Page page = pageRepository.findById(pageId)
                .orElseThrow(() -> new CustomException(ErrorCode.PAGE_NOT_FOUND));
        Long fromUserId = SecurityUtil.getCurrentUserId();
        PageUser fromPageUser = pageUserRepository.findByPageIdAndUserId(pageId, fromUserId)
                .orElseThrow(() -> new CustomException(ErrorCode.PAGE_USER_NOT_FOUND));
        if(fromPageUser.getPageUserRole().equals(PageUserRole.VIEWER)){
            throw new CustomException(ErrorCode.NO_AUTH_TO_INVITE_PAGE);
        }

        for(int i = 0; i<pageUserInviteDto.getTeamUserIdList().size(); i++){
            Long toTeamUserId = pageUserInviteDto.getTeamUserIdList().get(i);
            User toUser = teamUserRepository.findById(toTeamUserId)
                    .orElseThrow(() -> new CustomException(ErrorCode.TEAM_USER_NOT_FOUND)).getUser();

            if(!teamUserRepository.existsById(toTeamUserId)){
                throw new CustomException(ErrorCode.TEAM_USER_NOT_FOUND);
            }

            if(pageUserRepository.existsByPageIdAndUserId(pageId, toUser.getId())){
                throw new CustomException(ErrorCode.DUPLICATE_PAGE_USER);
            }

            PageUser newPageUser = PageUser.enrollPage(page, toUser);
            pageUserRepository.save(newPageUser);
        }
        return fromUserId;
    }

    @Override
    @Transactional
    public Long leavePageUser(Long pageId) {
        Long userId = SecurityUtil.getCurrentUserId();
        PageUser pageUser = pageUserRepository.findByPageIdAndUserId(pageId, userId)
                .orElseThrow(() -> new CustomException(ErrorCode.PAGE_USER_NOT_FOUND));
        pageUserRepository.deleteById(pageUser.getId());
        //todo: 페이지에 남은사람 0명이면 페이지 지워
        return pageUser.getId();
    }

    @Override
    @Transactional
    public Long deletePageUser(PageUserDeleteRequestDto pageUserDeleteRequestDto) {
        Long fromUserId = SecurityUtil.getCurrentUserId();
        //todo: for문안에서 쿼리 그만...
        for(int i=0; i<pageUserDeleteRequestDto.getPageUserId().size(); i++){
            Long toPageUserId = pageUserDeleteRequestDto.getPageUserId().get(i);

            PageUser toPageUser = pageUserRepository.findById(toPageUserId)
                    .orElseThrow(() -> new CustomException(ErrorCode.PAGE_USER_NOT_FOUND));

            PageUser fromPageUser = pageUserRepository.findByPageIdAndUserId(toPageUser.getPage().getId(), fromUserId)
                    .orElseThrow(() -> new CustomException(ErrorCode.PAGE_USER_NOT_FOUND));

            if(fromPageUser.getPageUserRole().getPriority()<=toPageUser.getPageUserRole().getPriority()){
                throw new CustomException(ErrorCode.NO_AUTH_TO_DELETE_PAGE);
            }
            pageUserRepository.deleteById(toPageUserId);

            //todo: 페이지에 남은사람 0명이면 페이지 지워
        }
        return fromUserId;
    }
}
