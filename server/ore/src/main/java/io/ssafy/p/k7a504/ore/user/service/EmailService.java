package io.ssafy.p.k7a504.ore.user.service;

import io.ssafy.p.k7a504.ore.user.dto.UserEmailVerificationRequestDto;

public interface EmailService {

    void sendMail(String to, String code);
    void sendCertificationMail(String email);
    boolean verifyEmail(UserEmailVerificationRequestDto requestDto);
    String createMessage(String code);
}
