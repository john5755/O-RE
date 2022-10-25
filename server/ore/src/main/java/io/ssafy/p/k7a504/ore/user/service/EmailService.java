package io.ssafy.p.k7a504.ore.user.service;

public interface EmailService {

    void sendMail(String to, String code);
    String sendCertificationMail(String email);
    String createMessage(String code);
}
