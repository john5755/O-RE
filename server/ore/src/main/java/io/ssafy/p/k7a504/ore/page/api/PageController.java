package io.ssafy.p.k7a504.ore.page.api;

import io.ssafy.p.k7a504.ore.common.response.BasicResponse;
import io.ssafy.p.k7a504.ore.common.response.CommonResponse;
import io.ssafy.p.k7a504.ore.page.dto.PageAddRequestDto;
import io.ssafy.p.k7a504.ore.page.dto.PageModifyRequestDto;
import io.ssafy.p.k7a504.ore.page.service.PageService;
import io.ssafy.p.k7a504.ore.pageUser.dto.PageUserInviteRequestDto;
import lombok.RequiredArgsConstructor;
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

    @GetMapping("detail/{pageId}")
    public ResponseEntity<? extends BasicResponse> pageDetail(@PathVariable Long pageId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(pageService.detailPage(pageId)));
    }

    @DeleteMapping("{pageId}")
    public ResponseEntity<? extends BasicResponse> pageRemove(@PathVariable Long pageId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(pageService.removePage(pageId)));
    }


    @GetMapping("list/{teamId}")
    public ResponseEntity<? extends BasicResponse> pageOfTeam(@PathVariable Long teamId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(pageService.pageOfTeam(teamId)));
    }

    @GetMapping
    public ResponseEntity<? extends BasicResponse> pageContainInput(@PathVariable Long teamId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(pageService.pageContainInput(teamId)));
    }

//    @PatchMapping("")
//    public ResponseEntity<? extends BasicResponse> pageModify(@RequestBody @Valid PageModifyRequestDto pageModifyRequestDto) {
//        return ResponseEntity.status(HttpStatus.OK)
//                .body(new CommonResponse<>(pageService.pageModify(pageModifyRequestDto)));
//    }

}
