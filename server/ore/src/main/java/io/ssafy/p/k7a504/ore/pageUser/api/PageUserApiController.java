package io.ssafy.p.k7a504.ore.pageUser.api;

import io.ssafy.p.k7a504.ore.common.response.BasicResponse;
import io.ssafy.p.k7a504.ore.common.response.CommonResponse;
import io.ssafy.p.k7a504.ore.pageUser.dto.PageUserDeleteRequestDto;
import io.ssafy.p.k7a504.ore.pageUser.dto.PageUserInviteRequestDto;
import io.ssafy.p.k7a504.ore.pageUser.dto.PageUserModifyAuthRequestDto;
import io.ssafy.p.k7a504.ore.pageUser.service.PageUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/page-user")
public class PageUserApiController {

    private final PageUserService pageUserService;

    @GetMapping("/list/u/{pageId}")
    public ResponseEntity<? extends BasicResponse> allUsersOfPage(@PathVariable Long pageId, Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(pageUserService.getPageUserList(pageId, pageable)));
    }

    @GetMapping("/{pageUserId}")
    public ResponseEntity<? extends BasicResponse> pageUserGet(@PathVariable Long pageUserId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(pageUserService.getPageUser(pageUserId)));
    }

    @PostMapping("/invite")
    public ResponseEntity<? extends BasicResponse> pageUserInvite(@RequestBody @Valid PageUserInviteRequestDto pageUserInviteDto) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(pageUserService.invitePageUser(pageUserInviteDto)));
    }

    @DeleteMapping("/leave/{pageId}")
    public ResponseEntity<? extends BasicResponse> pageUserLeave(@PathVariable Long pageId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(pageUserService.leavePageUser(pageId)));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<? extends BasicResponse> pageUserDelete(@RequestBody @Valid PageUserDeleteRequestDto pageUserDeleteDto) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(pageUserService.deletePageUser(pageUserDeleteDto)));
    }

    @PutMapping("")
    public ResponseEntity<? extends BasicResponse> pageUserModifyAuth(@RequestBody PageUserModifyAuthRequestDto pageUserModifyAuthRequestDto) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(pageUserService.changeAuth(pageUserModifyAuthRequestDto)));
    }

    @GetMapping("/list/p/{teamId}")
    public ResponseEntity<? extends BasicResponse> pageOfTeam(@PathVariable Long teamId, Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(pageUserService.pageOfTeam(teamId, pageable)));
    }

}
