package io.ssafy.p.k7a504.ore.user.api;

import io.ssafy.p.k7a504.ore.common.response.BasicResponse;
import io.ssafy.p.k7a504.ore.common.response.CommonResponse;
import io.ssafy.p.k7a504.ore.user.dto.*;
import io.ssafy.p.k7a504.ore.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserApiController {

    private final UserService userService;

    @GetMapping("/domain")
    public ResponseEntity<? extends BasicResponse> validateDomainUser() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(userService.validateDomainUser()));
    }

    @GetMapping("/verification")
    public ResponseEntity<? extends BasicResponse> sendCertificationEmail(@Valid @RequestParam String email) {
        userService.sendCertificationEmail(email);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/verification")
    public ResponseEntity<? extends BasicResponse> verifyEmail(@Valid @RequestBody UserEmailVerificationRequestDto emailVerificationRequestDto) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(userService.verifyEmail(emailVerificationRequestDto)));
    }

    @PostMapping("/signup")
    public ResponseEntity<? extends BasicResponse> signUp(@Valid @RequestBody UserSignUpRequestDto userSignUpRequestDto) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(userService.signUp(userSignUpRequestDto)));
    }

    @PostMapping("/signin")
    public ResponseEntity<? extends BasicResponse> signIn(@Valid @RequestBody UserSignInRequestDto userSignInRequestDto) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(userService.signIn(userSignInRequestDto)));
    }

    @PostMapping("/reissue")
    public ResponseEntity<? extends BasicResponse> reissue(@RequestBody TokenRequestDto tokenRequestDto) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(userService.reissue(tokenRequestDto)));
    }

    @PutMapping("/logout")
    public ResponseEntity<? extends BasicResponse> logout() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(userService.logout()));
    }

    @PostMapping("/password")
    public ResponseEntity<? extends BasicResponse> findUserPassword(@Valid @RequestBody UserInfoRequestDto userInfoRequestDto) {
        userService.findUserPassword(userInfoRequestDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PreAuthorize("hasAnyAuthority('OWNER','ADMIN')")
    @PostMapping("/list")
    public ResponseEntity<? extends BasicResponse> addUserList(@RequestPart(name = "file")MultipartFile file) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(userService.addUserList(file)));
    }

    @GetMapping("/name")
    public ResponseEntity<? extends BasicResponse> searchUserByName(@Valid @RequestParam String keyword, Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(userService.searchUserByName(keyword, pageable)));
    }

    @GetMapping("/nickname")
    public ResponseEntity<? extends BasicResponse> searchUserByNickname(@Valid @RequestParam String keyword, Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(userService.searchUserByNickname(keyword, pageable)));
    }

    @GetMapping("/list")
    public ResponseEntity<? extends BasicResponse> searchAllUser(Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(userService.searchAllUser(pageable)));
    }

    @GetMapping("/mypage")
    public ResponseEntity<? extends BasicResponse> findUserInfo() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(userService.findUserInfo()));
    }

    @PutMapping("/mypage")
    public ResponseEntity<? extends BasicResponse> modifyUserInfo(@RequestPart(value = "profileImage", required = false) MultipartFile profileImage, @RequestPart(value = "profileInfo") UserModifyReqeustDto profileInfo) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(userService.modifyUserInfo(profileImage, profileInfo)));
    }

    @PutMapping("/mypage/pw")
    public ResponseEntity<? extends BasicResponse> modifyUserPassword(@RequestBody UserPasswordRequestDto userPasswordRequestDto) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(userService.modifyUserPassword(userPasswordRequestDto)));
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    @DeleteMapping("")
    public ResponseEntity<? extends BasicResponse> leaveServer() {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(userService.leaveServer()));
    }

    @PreAuthorize("hasAnyAuthority('OWNER', 'ADMIN')")
    @DeleteMapping("/list")
    public ResponseEntity<? extends BasicResponse> removeUser(@RequestBody List<Long> userIds) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(userService.removeUser(userIds)));
    }

    @PreAuthorize("hasAnyAuthority('OWNER', 'ADMIN')")
    @PutMapping("/auth")
    public ResponseEntity<? extends BasicResponse> modifyUserAuthority(@Valid @RequestBody List<UserAuthModifyRequestDto> requestDtos) {
        return ResponseEntity.ok()
                .body(new CommonResponse<>(userService.modifyUserAuthority(requestDtos)));
    }


}
