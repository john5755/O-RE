package io.ssafy.p.k7a504.ore.user.api;

import io.ssafy.p.k7a504.ore.common.response.BasicResponse;
import io.ssafy.p.k7a504.ore.common.response.CommonResponse;
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
    public ResponseEntity<? extends BasicResponse> verifyEmail(@Valid @RequestParam String email) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(userService.verifyEmail(email)));
    }

    @PostMapping("/api/users/signup")
    public ResponseEntity<? extends BasicResponse> signUp(@RequestBody UserSignUpRequestDto userSignUpRequestDto) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(userService.signUp(userSignUpRequestDto)));
    }

}
