package io.ssafy.p.k7a504.ore.user.service;

import io.ssafy.p.k7a504.ore.user.dto.EmailResponseDto;
import io.ssafy.p.k7a504.ore.user.dto.UserSignUpRequestDto;

public interface UserService {
    EmailResponseDto verifyEmail(String email);
    String signUp(UserSignUpRequestDto userSignUpRequestDto);
}
