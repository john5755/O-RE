package io.ssafy.p.k7a504.ore.user.service;

import io.ssafy.p.k7a504.ore.jwt.TokenDto;
import io.ssafy.p.k7a504.ore.user.dto.UserEmailVerificationRequestDto;
import io.ssafy.p.k7a504.ore.user.dto.UserSignInRequestDto;
import io.ssafy.p.k7a504.ore.user.dto.UserSignUpRequestDto;

public interface UserService {
    void sendCertificationEmail(String email);
    boolean verifyEmail(UserEmailVerificationRequestDto emailVerificationRequestDto);
    String signUp(UserSignUpRequestDto userSignUpRequestDto);
    TokenDto signIn(UserSignInRequestDto userSignInRequestDto);
}
