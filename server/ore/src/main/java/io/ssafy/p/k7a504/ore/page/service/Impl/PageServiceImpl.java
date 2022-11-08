package io.ssafy.p.k7a504.ore.page.service.Impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.ssafy.p.k7a504.ore.common.exception.CustomException;
import io.ssafy.p.k7a504.ore.common.exception.ErrorCode;
import io.ssafy.p.k7a504.ore.common.security.SecurityUtil;
import io.ssafy.p.k7a504.ore.page.domain.Content;
import io.ssafy.p.k7a504.ore.page.repository.ContentRepository;
import io.ssafy.p.k7a504.ore.page.domain.Page;
import io.ssafy.p.k7a504.ore.page.dto.PageAddRequestDto;
import io.ssafy.p.k7a504.ore.page.dto.PageAddResponseDto;
import io.ssafy.p.k7a504.ore.page.dto.PageDetailResponseDto;
import io.ssafy.p.k7a504.ore.page.repository.PageRepository;
import io.ssafy.p.k7a504.ore.page.service.PageService;
import io.ssafy.p.k7a504.ore.pageUser.domain.PageUser;
import io.ssafy.p.k7a504.ore.pageUser.domain.PageUserRole;
import io.ssafy.p.k7a504.ore.pageUser.dto.PageContainInputResponseDto;
import io.ssafy.p.k7a504.ore.pageUser.repository.PageUserRepository;
import io.ssafy.p.k7a504.ore.teamUser.domain.TeamUser;
import io.ssafy.p.k7a504.ore.teamUser.repository.TeamUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class PageServiceImpl implements PageService {

    private final PageRepository pageRepository;
    private final TeamUserRepository teamUserRepository;
    private final PageUserRepository pageUserRepository;
    private final ContentRepository contentRepository;


    @Override
    @Transactional
    public PageAddResponseDto addPage(PageAddRequestDto pageAddRequestDto) {
        Long userId = SecurityUtil.getCurrentUserId();
        Long teamId = pageAddRequestDto.getTeamId();
        TeamUser teamUser = teamUserRepository.findByUserIdAndTeamId(userId, teamId)
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_USER_NOT_FOUND));
        String pageStatus = pageAddRequestDto.getPageStatus();
        if(!pageStatus.equals("INCLUDE_INPUT")&&!pageStatus.equals("EXCLUDE_INPUT")){
            throw new CustomException(ErrorCode.PAGE_STATUS_NOT_FOUND);
        }
        Page page = Page.createPage(teamUser, pageAddRequestDto);
        pageRepository.save(page);

        List<Content> contents = new ArrayList<>();
        try {
            for(Map<String, Object> map : pageAddRequestDto.getContent()){
                String contentValue = new ObjectMapper().writeValueAsString(map);
                Content content = Content.createContent(page,contentValue);
                contents.add(content);
            }
        }
        catch (Exception ex) {
            throw new CustomException(ErrorCode.CANT_CONVERT_TO_STRING);
        }
        contentRepository.saveAll(contents);

        PageUser pageUser = PageUser.enrollPage(page, teamUser.getUser());
        pageUser.adjustRoleByMaintainer(pageUser, PageUserRole.MAINTAINER);
        pageUserRepository.save(pageUser);

        return new PageAddResponseDto(page, pageAddRequestDto.getContent());
    }

    @Override
    public PageDetailResponseDto detailPage(Long pageId) {
        Page page = pageRepository.findById(pageId)
                .orElseThrow(() -> new CustomException(ErrorCode.PAGE_NOT_FOUND));
        List<HashMap<String,Object>> contentValueMaps = new ArrayList<>();
        try {
            for(int i=0; i<page.getContent().size(); i++){
                String contentValue = page.getContent().get(i).getContentValue();
                HashMap<String, Object> map = new ObjectMapper().readValue(contentValue, HashMap.class);
                contentValueMaps.add(map);
            }
        }
        catch (Exception ex) {
            throw new CustomException(ErrorCode.CANT_CONVERT_TO_JSON);
        }
        return new PageDetailResponseDto(page, contentValueMaps);
    }

    @Override
    @Transactional
    public Long removePage(Long pageId) {
        if(!pageRepository.existsById(pageId)){
            throw new CustomException(ErrorCode.PAGE_NOT_FOUND);
        }

        Long userId = SecurityUtil.getCurrentUserId();
        PageUser pageUser = pageUserRepository.findByPageIdAndUserId(pageId, userId)
                .orElseThrow(() -> new CustomException(ErrorCode.PAGE_USER_NOT_FOUND));
        if(pageUser.getPageUserRole()!=PageUserRole.MAINTAINER){
            throw new CustomException(ErrorCode.NO_AUTH_TO_DELETE);
        }
        pageRepository.deleteById(pageId);
        return pageId;
    }

    @Override
    public Slice<PageContainInputResponseDto> pageContainInput(Long teamId, Pageable pageable) {
        Long userId = SecurityUtil.getCurrentUserId();
        Slice<Page> pageList = pageRepository.findByTeamIdAndUserIdAndPageStatus(teamId,userId, pageable);
        return pageList.map(PageContainInputResponseDto::new);
    }
}