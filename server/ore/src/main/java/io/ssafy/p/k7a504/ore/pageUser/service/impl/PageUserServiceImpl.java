package io.ssafy.p.k7a504.ore.pageUser.service.impl;

import io.ssafy.p.k7a504.ore.common.exception.CustomException;
import io.ssafy.p.k7a504.ore.common.exception.ErrorCode;
import io.ssafy.p.k7a504.ore.common.security.SecurityUtil;
import io.ssafy.p.k7a504.ore.page.domain.Page;
import io.ssafy.p.k7a504.ore.page.domain.PageRepository;
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
        PageUserResponseDto pageUserResponseDto = PageUserResponseDto.builder()
                .pageUser(pageUser)
                .build();
        return pageUserResponseDto;
    }

    @Override
    public List<PageUserResponseDto> getPageUserList(Long pageId) {
        List<PageUser> pageUserList = pageUserRepository.findAllByPageId(pageId)
                .orElseThrow(() -> new CustomException(ErrorCode.PAGE_USER_NOT_FOUND));
        return pageUserList.stream().map(PageUserResponseDto::new).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PageUserResponseDto changeAuth(PageUserModifyAuthRequestDto pageUserModifyAuthRequestDto) {
        Long toPageUserId = pageUserModifyAuthRequestDto.getPageUserId();
        PageUser toPageUser = pageUserRepository.findById(toPageUserId)
                .orElseThrow(() -> new CustomException(ErrorCode.PAGE_USER_NOT_FOUND));

        Long pageId = toPageUser.getPage().getId();
        Long fromUserId = SecurityUtil.getCurrentUserId();
        PageUser fromPageUser = pageUserRepository.findByPageIdAndUserId(pageId, fromUserId)
                .orElseThrow(() -> new CustomException(ErrorCode.PAGE_USER_NOT_FOUND));
        fromPageUser.grantRole(toPageUser, pageUserModifyAuthRequestDto.getPageUserRole());
        PageUserResponseDto pageUserResponseDto = PageUserResponseDto.builder()
                .pageUser(toPageUser)
                .build();
        pageUserRepository.save(toPageUser);
        return pageUserResponseDto;
    }

    @Override
    @Transactional
    public PageUserResponseDto invitePageUser(PageUserInviteRequestDto pageUserInviteDto){
        Long toTeamUserId = pageUserInviteDto.getTeamUserId();
        User toUser = teamUserRepository.findById(toTeamUserId)
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_USER_NOT_FOUND)).getUser();

        Long pageId = pageUserInviteDto.getPageId();
        Page page = pageRepository.findById(pageId)
                .orElseThrow(() -> new CustomException(ErrorCode.PAGE_NOT_FOUND));

        Long fromUserId = SecurityUtil.getCurrentUserId();
        PageUser fromPageUser = pageUserRepository.findByPageIdAndUserId(pageId, fromUserId)
                .orElseThrow(() -> new CustomException(ErrorCode.PAGE_USER_NOT_FOUND));

        if(!teamUserRepository.existsById(toTeamUserId)){
            throw new CustomException(ErrorCode.TEAM_USER_NOT_FOUND);
        }

        if(pageUserRepository.existsByPageIdAndUserId(pageId, toUser.getId())){
            throw new CustomException(ErrorCode.DUPLICATE_PAGE_USER);
        }

        if(fromPageUser.getPageUserRole().equals(PageUserRole.VIEWER)){
            throw new CustomException(ErrorCode.NO_AUTH_TO_INVITE_PAGE);
        }

        PageUser newPageUser = PageUser.enrollPage(page, toUser);
        pageUserRepository.save(newPageUser);
        PageUserResponseDto pageUserResponseDto = PageUserResponseDto.builder()
                .pageUser(newPageUser)
                .build();
        return pageUserResponseDto;
    }

    @Override
    @Transactional
    public Long leavePageUser(Long pageId) {
        Long userId = SecurityUtil.getCurrentUserId();
        PageUser pageUser = pageUserRepository.findByPageIdAndUserId(pageId, userId)
                .orElseThrow(() -> new CustomException(ErrorCode.PAGE_USER_NOT_FOUND));
        pageUserRepository.deleteById(pageUser.getId());
        return pageUser.getId();
    }

    @Override
    @Transactional
    public Long deletePageUser(PageUserDeleteRequestDto pageUserDeleteRequestDto) {
        Long toPageUserId = pageUserDeleteRequestDto.getPageUserId();
        Long fromUserId = SecurityUtil.getCurrentUserId();

        PageUser toPageUser = pageUserRepository.findById(toPageUserId)
                .orElseThrow(() -> new CustomException(ErrorCode.PAGE_USER_NOT_FOUND));
        PageUser fromPageUser = pageUserRepository.findByPageIdAndUserId(toPageUser.getPage().getId(), fromUserId)
                .orElseThrow(() -> new CustomException(ErrorCode.PAGE_USER_NOT_FOUND));

        if(fromPageUser.getPageUserRole().getPriority()<=toPageUser.getPageUserRole().getPriority()){
            throw new CustomException(ErrorCode.NO_AUTH_TO_DELETE_PAGE);
        }
        pageUserRepository.deleteById(toPageUserId);
        return toPageUserId;
    }
}
