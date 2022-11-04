package io.ssafy.p.k7a504.ore.page.service;

import io.ssafy.p.k7a504.ore.page.dto.*;

import java.util.List;

public interface PageService {
    PageAddResponseDto addPage(PageAddRequestDto pageAddRequestDto);
    PageDetailResponseDto detailPage(Long pageId);
    Long removePage(Long pageId);
    List<PageOfTeamResponseDto> pageOfTeam(Long teamId);
    List<PageContainInputResponseDto> pageContainInput(Long teamId);
//    PageModifyResponseDto pageModify(PageModifyRequestDto pageModifyRequestDto);
}
