package io.ssafy.p.k7a504.ore.page.service;

import io.ssafy.p.k7a504.ore.page.dto.PageAddRequestDto;
import io.ssafy.p.k7a504.ore.page.dto.PageAddResponseDto;
import io.ssafy.p.k7a504.ore.page.dto.PageDetailResponseDto;

public interface PageService {
    PageAddResponseDto addPage(PageAddRequestDto pageAddRequestDto);
    PageDetailResponseDto detailPage(Long pageId);
    Long removePage(Long pageId);
}
