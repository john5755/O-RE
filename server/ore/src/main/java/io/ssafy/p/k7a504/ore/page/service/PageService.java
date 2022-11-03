package io.ssafy.p.k7a504.ore.page.service;

import io.ssafy.p.k7a504.ore.page.domain.Page;
import io.ssafy.p.k7a504.ore.page.dto.PageAddRequestDto;
import io.ssafy.p.k7a504.ore.page.dto.PageAddResponseDto;
import io.ssafy.p.k7a504.ore.page.dto.PageDetailResponseDto;
import io.ssafy.p.k7a504.ore.page.dto.PageOfTeamResponseDto;

import java.util.List;

public interface PageService {
    PageAddResponseDto addPage(PageAddRequestDto pageAddRequestDto);
    PageDetailResponseDto detailPage(Long pageId);
    Long removePage(Long pageId);
    List<PageOfTeamResponseDto> pageOfTeam(Long teamId);
}
