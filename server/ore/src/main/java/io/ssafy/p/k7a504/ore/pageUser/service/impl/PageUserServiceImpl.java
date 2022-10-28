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
import io.ssafy.p.k7a504.ore.pageUser.dto.PageUserResponseDto;
import io.ssafy.p.k7a504.ore.pageUser.repository.PageUserRepository;
import io.ssafy.p.k7a504.ore.pageUser.service.PageUserService;
import io.ssafy.p.k7a504.ore.teamUser.repository.TeamUserRepository;
import io.ssafy.p.k7a504.ore.user.domain.User;
import io.ssafy.p.k7a504.ore.user.repository.UserRepository;
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
    final private UserRepository userRepository;
    final private TeamUserRepository teamUserRepository;
    final private PageRepository pageRepository;

    @Override
    public PageUserResponseDto getPageUser(Long pageId, Long userId){
        if(!userRepository.existsById(userId)){
            throw  new CustomException(ErrorCode.USER_NOT_FOUND);
        }

        PageUser pageUser = pageUserRepository.findByPageIdAndUserId(pageId, userId)
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
    public PageUserResponseDto invitePageUser(PageUserInviteRequestDto pageUserInviteDto){
        Long pageId = pageUserInviteDto.getPageId();
        Page page = pageRepository.findPageById(pageId)
                .orElseThrow(() -> new CustomException(ErrorCode.PAGE_NOT_FOUND));

        Long toUserId = pageUserInviteDto.getUserId();

        User toUser = userRepository.findById(toUserId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        Long teamId = page.getTeam().getId();

        if(!teamUserRepository.existsByTeamIdAndUserId(teamId, toUserId)){
         throw new CustomException(ErrorCode.TEAM_USER_NOT_FOUND);
        }

        if(pageUserRepository.existsByPageIdAndUserId(pageId, toUserId)){
            throw new CustomException(ErrorCode.DUPLICATE_PAGE_USER);
        }

        Long fromUserId = SecurityUtil.getCurrentUserId();
        PageUser fromPageUser = pageUserRepository.findByPageIdAndUserId(pageId, fromUserId)
                .orElseThrow(() -> new CustomException(ErrorCode.PAGE_USER_NOT_FOUND));
        if(fromPageUser.getPageUserRole().equals(PageUserRole.VIEWER)){
            throw new CustomException(ErrorCode.NO_AUTH_TO_INVITE);
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
        Long toUserId = pageUserDeleteRequestDto.getUserId();
        Long fromUserId = SecurityUtil.getCurrentUserId();

        if(!userRepository.existsById(toUserId)||!userRepository.existsById(fromUserId)){
            throw  new CustomException(ErrorCode.USER_NOT_FOUND);
        }

        PageUser toPageUser = pageUserRepository.findByPageIdAndUserId(pageUserDeleteRequestDto.getPageId(), toUserId)
                .orElseThrow(() -> new CustomException(ErrorCode.PAGE_USER_NOT_FOUND));
        PageUser fromPageUser = pageUserRepository.findByPageIdAndUserId(pageUserDeleteRequestDto.getPageId(), fromUserId)
                .orElseThrow(() -> new CustomException(ErrorCode.PAGE_USER_NOT_FOUND));

        if(fromPageUser.getPageUserRole().getPriority()<=toPageUser.getPageUserRole().getPriority()){
            throw new CustomException(ErrorCode.NO_AUTH_TO_DELETE);
        }

        pageUserRepository.deleteById(toPageUser.getId());
        return toPageUser.getId();
    }
}
