package io.ssafy.p.k7a504.ore.user.service;

import io.ssafy.p.k7a504.ore.user.dto.UserSignUpRequestDto;

public interface UserService {
    void sendCertificationEmail(String email);
    String verifyEmail(String code);
    String signUp(UserSignUpRequestDto userSignUpRequestDto);
}
