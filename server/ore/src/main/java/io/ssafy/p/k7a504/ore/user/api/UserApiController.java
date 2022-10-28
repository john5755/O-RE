package io.ssafy.p.k7a504.ore.user.api;

import io.ssafy.p.k7a504.ore.common.response.BasicResponse;
import io.ssafy.p.k7a504.ore.common.response.CommonResponse;
import io.ssafy.p.k7a504.ore.user.dto.*;
import io.ssafy.p.k7a504.ore.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
public class UserApiController {

    private final UserService userService;

    @GetMapping("/api/users/verification")
    public ResponseEntity<? extends BasicResponse> sendCertificationEmail(@Valid @RequestParam String email) {
        userService.sendCertificationEmail(email);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/api/users/verification")
    public ResponseEntity<? extends BasicResponse> verifyEmail(@Valid @RequestBody UserEmailVerificationRequestDto emailVerificationRequestDto) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(userService.verifyEmail(emailVerificationRequestDto)));
    }

    @PostMapping("/api/users/signup")
    public ResponseEntity<? extends BasicResponse> signUp(@Valid @RequestBody UserSignUpRequestDto userSignUpRequestDto) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(userService.signUp(userSignUpRequestDto)));
    }

    @PostMapping("/api/users/signin")
    public ResponseEntity<? extends BasicResponse> signIn(@Valid @RequestBody UserSignInRequestDto userSignInRequestDto) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(userService.signIn(userSignInRequestDto)));
    }

    @PostMapping("/api/users/password")
    public ResponseEntity<? extends BasicResponse> findUserPassword(@Valid @RequestBody UserInfoRequestDto userInfoRequestDto) {
        userService.findUserPassword(userInfoRequestDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PatchMapping("/api/users/password")
    public ResponseEntity<? extends BasicResponse> changeUserPassword(@Valid @RequestBody UserPasswordRequestDto userPasswordRequestDto) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(userService.changeUserPassword(userPasswordRequestDto)));
    }

    // TODO: PreAuthorize() 설정 필요
    @PostMapping("/api/users/list")
    public ResponseEntity<? extends BasicResponse> addUserList(@RequestPart(name = "file")MultipartFile file) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(userService.addUserList(file)));
    }



}
