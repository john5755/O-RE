package io.ssafy.p.k7a504.ore.page.service;

import io.ssafy.p.k7a504.ore.page.dto.PageAddRequestDto;
import io.ssafy.p.k7a504.ore.page.dto.PageAddResponseDto;

public interface PageService {
    PageAddResponseDto addPage(PageAddRequestDto pageAddRequestDto);

}
