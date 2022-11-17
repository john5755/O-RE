package io.ssafy.p.k7a504.ore.page.api;

import io.ssafy.p.k7a504.ore.common.response.BasicResponse;
import io.ssafy.p.k7a504.ore.common.response.CommonResponse;
import io.ssafy.p.k7a504.ore.page.dto.PageAddRequestDto;
import io.ssafy.p.k7a504.ore.page.service.PageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/pages")
public class PageController {

    final private PageService pageService;

    @PostMapping("")
    public ResponseEntity<? extends BasicResponse> pageAdd(@RequestBody @Valid PageAddRequestDto pageAddRequestDto) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(pageService.addPage(pageAddRequestDto)));
    }

    @GetMapping("/detail/{pageId}")
    public ResponseEntity<? extends BasicResponse> pageDetail(@PathVariable Long pageId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(pageService.detailPage(pageId)));
    }

    @DeleteMapping("/{pageId}")
    public ResponseEntity<? extends BasicResponse> pageRemove(@PathVariable Long pageId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(pageService.removePage(pageId)));
    }

    @GetMapping("/status/{teamId}")
    public ResponseEntity<? extends BasicResponse> pageContainInput(@PathVariable Long teamId, Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(pageService.pageContainInput(teamId, pageable)));
    }




}
