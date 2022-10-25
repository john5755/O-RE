package io.ssafy.p.k7a504.ore.user.service.impl;

import io.ssafy.p.k7a504.ore.user.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Override
    public void sendMail(String to, String code) {

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        try {
            mimeMessage.addRecipients(Message.RecipientType.TO, to);
            mimeMessage.setFrom(new InternetAddress("oreofficialcontact@naver.com", "ore_official"));
            mimeMessage.setSubject("O:RE 회원가입 이메일 인증");
            mimeMessage.setText(createMessage(code), "utf-8", "html");
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException();
        }
        mailSender.send(mimeMessage);
    }

    @Override
    public String sendCertificationMail(String email) {
        String code = UUID.randomUUID().toString().substring(0, 8);
        sendMail(email, code);
        return code;
    }

    @Override
    public String createMessage(String code) {
        return "<div>\n" +
                "    <div></div><span>"+code+"</span>\n" +
                "</div>";
    }
}
