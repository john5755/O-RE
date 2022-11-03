package io.ssafy.p.k7a504.ore.page.service.Impl;

import io.ssafy.p.k7a504.ore.common.exception.CustomException;
import io.ssafy.p.k7a504.ore.common.exception.ErrorCode;
import io.ssafy.p.k7a504.ore.common.security.SecurityUtil;
import io.ssafy.p.k7a504.ore.page.domain.Page;
import io.ssafy.p.k7a504.ore.page.dto.PageAddRequestDto;
import io.ssafy.p.k7a504.ore.page.dto.PageAddResponseDto;
import io.ssafy.p.k7a504.ore.page.dto.PageDetailResponseDto;
import io.ssafy.p.k7a504.ore.page.repository.PageRepository;
import io.ssafy.p.k7a504.ore.page.service.PageService;
import io.ssafy.p.k7a504.ore.pageUser.domain.PageUser;
import io.ssafy.p.k7a504.ore.pageUser.domain.PageUserRole;
import io.ssafy.p.k7a504.ore.pageUser.repository.PageUserRepository;
import io.ssafy.p.k7a504.ore.teamUser.domain.TeamUser;
import io.ssafy.p.k7a504.ore.teamUser.repository.TeamUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class PageServiceImpl implements PageService {

    private final PageRepository pageRepository;
    private final TeamUserRepository teamUserRepository;
    private final PageUserRepository pageUserRepository;


    @Override
    @Transactional
    public PageAddResponseDto addPage(PageAddRequestDto pageAddRequestDto) {
        Long userId = SecurityUtil.getCurrentUserId();
        Long teamId = pageAddRequestDto.getTeamId();
        TeamUser teamUser = teamUserRepository.getByUserIdAndTeamId(userId, teamId);
        String content = pageAddRequestDto.getContent().toString();
        String pageStatus = pageAddRequestDto.getPageStatus();
        if(!pageStatus.equals("INCLUDE_INPUT")&&!pageStatus.equals("EXCLUDE_INPUT")){
            throw new CustomException(ErrorCode.STATUS_NOT_VALID);
        }
        Page page = Page.createPage(teamUser, pageAddRequestDto.getName(), pageStatus, content);
        pageRepository.save(page);

        PageUser pageUser = PageUser.enrollPage(page, teamUser.getUser());
        pageUser.adjustRoleByMaintainer(pageUser, PageUserRole.MAINTAINER);
        pageUserRepository.save(pageUser);


        return new PageAddResponseDto(page, pageAddRequestDto.getContent());
    }

    @Override
    public PageDetailResponseDto detailPage(Long pageId) {
        Page page = pageRepository.findById(pageId)
                .orElseThrow(() -> new CustomException(ErrorCode.PAGE_NOT_FOUND));
        return new PageDetailResponseDto(page);
    }

    @Override
    public Long removePage(Long pageId) {
        if(!pageRepository.existsById(pageId)){
            throw new CustomException(ErrorCode.PAGE_NOT_FOUND);
        }

        //페이지 지울 수 있는 권한 있는지 확인
        Long userId = SecurityUtil.getCurrentUserId();
        PageUser pageUser = pageUserRepository.findByPageIdAndUserId(pageId, userId)
                .orElseThrow(() -> new CustomException(ErrorCode.PAGE_USER_NOT_FOUND));
        if(!pageUser.getPageUserRole().equals(PageUserRole.MAINTAINER)){
            //todo : 페이지 삭제 권한없음 추가
        }
        pageRepository.deleteById(pageId);
        return pageId;
    }


}