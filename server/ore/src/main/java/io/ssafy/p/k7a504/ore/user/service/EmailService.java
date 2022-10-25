package io.ssafy.p.k7a504.ore.user.service;

public interface EmailService {

    void sendMail(String to, String code);
    void sendCertificationMail(String email);
    String verifyEmail(String code);
    String createMessage(String code);
}
