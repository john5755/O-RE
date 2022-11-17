package io.ssafy.p.k7a504.ore.user.service;

import io.ssafy.p.k7a504.ore.user.dto.UserEmailVerificationRequestDto;

public interface EmailService {

    void sendMail(String to, String sub, String text);
    void sendCertificationMail(String email);
    boolean verifyEmail(UserEmailVerificationRequestDto requestDto);
    void sendTempPasswordMail(String email, String tempPassword);
}
