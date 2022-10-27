package io.ssafy.p.k7a504.ore.user.api;

import io.ssafy.p.k7a504.ore.common.response.BasicResponse;
import io.ssafy.p.k7a504.ore.common.response.CommonResponse;
import io.ssafy.p.k7a504.ore.user.dto.UserSignInRequestDto;
import io.ssafy.p.k7a504.ore.user.dto.UserSignUpRequestDto;
import io.ssafy.p.k7a504.ore.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/api/users/verificaation")
    public ResponseEntity<? extends BasicResponse> verifyEmail(@Valid @RequestParam String code) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(userService.verifyEmail(code)));
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

}
