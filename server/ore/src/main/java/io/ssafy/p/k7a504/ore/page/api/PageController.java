package io.ssafy.p.k7a504.ore.page.api;

import io.ssafy.p.k7a504.ore.common.response.BasicResponse;
import io.ssafy.p.k7a504.ore.common.response.CommonResponse;
import io.ssafy.p.k7a504.ore.page.dto.PageAddRequestDto;
import io.ssafy.p.k7a504.ore.page.service.PageService;
import io.ssafy.p.k7a504.ore.pageUser.dto.PageUserInviteRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/page")
public class PageController {

    final private PageService pageService;

    @PostMapping("")
    public ResponseEntity<? extends BasicResponse> pageAdd(@RequestBody @Valid PageAddRequestDto pageAddRequestDto) {
        System.out.println(pageAddRequestDto.getContent().size());
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(pageService.addPage(pageAddRequestDto)));
    }
}
