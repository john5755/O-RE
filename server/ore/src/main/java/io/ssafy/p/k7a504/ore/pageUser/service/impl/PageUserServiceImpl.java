package io.ssafy.p.k7a504.ore.pageUser.service.impl;

import io.ssafy.p.k7a504.ore.common.exception.CustomException;
import io.ssafy.p.k7a504.ore.common.exception.ErrorCode;
import io.ssafy.p.k7a504.ore.page.domain.Page;
import io.ssafy.p.k7a504.ore.page.domain.PageRepository;
import io.ssafy.p.k7a504.ore.pageUser.domain.PageUser;
import io.ssafy.p.k7a504.ore.pageUser.dto.PageUserDeleteRequestDto;
import io.ssafy.p.k7a504.ore.pageUser.dto.PageUserGetRequestDto;
import io.ssafy.p.k7a504.ore.pageUser.dto.PageUserResponseDto;
import io.ssafy.p.k7a504.ore.pageUser.dto.PageUserInviteRequestDto;
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
    public PageUserResponseDto getPageUser(PageUserGetRequestDto pageUserGetDto){
        Long userId = pageUserGetDto.getUserId();
        if(!userRepository.existsById(userId)){
            throw  new CustomException(ErrorCode.USER_NOT_FOUND);
        }

        PageUser pageUser = pageUserRepository.findByPageIdAndUserId(pageUserGetDto.getPageId(), userId)
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

        Long userId = pageUserInviteDto.getUserId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        PageUser newPageUser = PageUser.enrollPage(page, user);
        pageUserRepository.save(newPageUser);
        PageUserResponseDto pageUserResponseDto = PageUserResponseDto.builder()
                .pageUser(newPageUser)
                .build();
        return pageUserResponseDto;
    }

    @Override
    @Transactional
    public Long leavePageUser(Long pageId) {
        //todo : JWT로 userId가져오기
        //테스트를 위해 임시로 userId=1로 넣어두었습니다.
        Long userId = Long.valueOf(1);
        PageUser pageUser = pageUserRepository.findByPageIdAndUserId(pageId, userId)
                .orElseThrow(() -> new CustomException(ErrorCode.PAGE_USER_NOT_FOUND));
        pageUserRepository.deleteById(pageUser.getId());
        return pageUser.getId();
    }

    @Override
    @Transactional
    public Long deletePageUser(PageUserDeleteRequestDto pageUserDeleteDto) {
        Long userId = pageUserDeleteDto.getUserId();
        if(!userRepository.existsById(userId)){
            throw  new CustomException(ErrorCode.USER_NOT_FOUND);
        }

        PageUser pageUser = pageUserRepository.findByPageIdAndUserId(pageUserDeleteDto.getPageId(), userId)
                .orElseThrow(() -> new CustomException(ErrorCode.PAGE_USER_NOT_FOUND));
        pageUserRepository.deleteById(pageUser.getId());
        return pageUser.getId();
    }
}
