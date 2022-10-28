package io.ssafy.p.k7a504.ore.pageUser.api;

import io.ssafy.p.k7a504.ore.common.response.BasicResponse;
import io.ssafy.p.k7a504.ore.common.response.CommonResponse;
import io.ssafy.p.k7a504.ore.pageUser.dto.PageUserDeleteRequestDto;
import io.ssafy.p.k7a504.ore.pageUser.dto.PageUserGetRequestDto;
import io.ssafy.p.k7a504.ore.pageUser.dto.PageUserInviteRequestDto;
import io.ssafy.p.k7a504.ore.pageUser.service.PageUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/page-user")
public class PageUserApiController {

    private final PageUserService pageUserService;

    @GetMapping("/list/{pageId}")
    public ResponseEntity<? extends BasicResponse> allUsersOfPage(@PathVariable Long pageId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(pageUserService.getPageUserList(pageId)));
    }

    @GetMapping("/{pageId}")
    public ResponseEntity<? extends BasicResponse> pageUserGet(@PathVariable Long pageId, @RequestParam("user-id") Long userId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(pageUserService.getPageUser(pageId, userId)));
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

//    @PutMapping("")
//    public ResponseEntity<UserSigninDto> pageUserModify(@RequestBody Map<String, String> map) {
//
//    }
}
