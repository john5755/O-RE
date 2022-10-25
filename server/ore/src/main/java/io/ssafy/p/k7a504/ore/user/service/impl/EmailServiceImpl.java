package io.ssafy.p.k7a504.ore.user.service.impl;

import io.ssafy.p.k7a504.ore.common.exception.CustomException;
import io.ssafy.p.k7a504.ore.common.exception.ErrorCode;
import io.ssafy.p.k7a504.ore.common.redis.RedisUtil;
import io.ssafy.p.k7a504.ore.user.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;
    private final RedisUtil redisUtil;

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
    @Transactional
    public void sendCertificationMail(String email) {
        String code = UUID.randomUUID().toString().substring(0, 8);
        sendMail(email, code);
        redisUtil.setDataExpire(code, email, 60 * 10L);
    }

    @Override
    public String verifyEmail(String code) {
        String email = redisUtil.getData(code);
        if(email == null)
            throw new CustomException(ErrorCode.NOT_VALID_CERTIFICATION_CODE);
        redisUtil.deleteData(code);
        return email;
    }

    @Override
    public String createMessage(String code) {
        return "<td width=\"520\" style=\"font-size: 0; line-height: 0; padding: 20\">\n" +
                "      <table\n" +
                "        cellpadding=\"0\"\n" +
                "        cellspacing=\"0\"\n" +
                "        width=\"100%\"\n" +
                "        border=\"0\"\n" +
                "        style=\"border-collapse: collapse\"\n" +
                "      >\n" +
                "        <!-- 헤더 시작 -->\n" +
                "        <tbody>\n" +
                "          <!-- //헤더 상단 여백 -->\n" +
                "          <tr>\n" +
                "            <td width=\"520\" style=\"font-size: 0\">\n" +
                "              <span\n" +
                "                style=\"\n" +
                "                  font-family: 'Nanum Gothic', 'Malgun Gothic', 'dotum',\n" +
                "                    'AppleGothic', Helvetica, Arial, Sans-Serif;\n" +
                "                  font-size: 50px;\n" +
                "                  line-height: 1.3;\n" +
                "                  font-weight: bolder;\n" +
                "                  letter-spacing: -1px;\n" +
                "                  color: #48a3a9;\n" +
                "                \"\n" +
                "                ><b>O:RE</b></span\n" +
                "              >\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "          <tr>\n" +
                "            <td\n" +
                "              width=\"520\"\n" +
                "              height=\"10\"\n" +
                "              style=\"font-size: 0; line-height: 0\"\n" +
                "            ></td>\n" +
                "          </tr>\n" +
                "          <!-- //콘텐츠 영역 간 여백 -->\n" +
                "          <tr>\n" +
                "            <td width=\"520\" style=\"font-size: 0\">\n" +
                "              <span\n" +
                "                style=\"\n" +
                "                  font-family: 'Nanum Gothic', 'Malgun Gothic', 'dotum',\n" +
                "                    'AppleGothic', Helvetica, Arial, Sans-Serif;\n" +
                "                  font-size: 22px;\n" +
                "                  line-height: 1.3;\n" +
                "                  letter-spacing: -1px;\n" +
                "                  color: rgba(0, 0, 0, 0.8);\n" +
                "                \"\n" +
                "                ><b>인증메일</b></span\n" +
                "              >\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "          <!-- //헤더 타이틀 -->\n" +
                "          <tr>\n" +
                "            <td\n" +
                "              width=\"520\"\n" +
                "              height=\"25\"\n" +
                "              style=\"\n" +
                "                font-size: 0;\n" +
                "                line-height: 0;\n" +
                "                border-bottom: 2px solid rgba(0, 0, 0, 0.3);\n" +
                "              \"\n" +
                "            ></td>\n" +
                "          </tr>\n" +
                "          <!-- //콘텐츠 영역 간 여백 -->\n" +
                "          <!-- //헤더 끝 -->\n" +
                "          <!-- 본문 시작 -->\n" +
                "          <tr>\n" +
                "            <td\n" +
                "              width=\"520\"\n" +
                "              height=\"50\"\n" +
                "              style=\"font-size: 0; line-height: 0\"\n" +
                "            ></td>\n" +
                "          </tr>\n" +
                "          <!-- //콘텐츠 영역 간 여백 -->\n" +
                "          <tr>\n" +
                "            <td width=\"520\" style=\"font-size: 0\">\n" +
                "              <span\n" +
                "                style=\"\n" +
                "                  font-family: 'Nanum Gothic', 'Malgun Gothic', 'dotum',\n" +
                "                    'AppleGothic', Helvetica, Arial, Sans-Serif;\n" +
                "                  font-size: 16px;\n" +
                "                  line-height: 1.6;\n" +
                "                  letter-spacing: -1px;\n" +
                "                \"\n" +
                "                >O:RE 회원가입을 위한 인증번호 발송 메일입니다.<br />\n" +
                "                <br />아래의 인증번호를 사용하여 이메일 주소 인증을 완료하세요.\n" +
                "              </span>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "          <tr>\n" +
                "            <td\n" +
                "              width=\"520\"\n" +
                "              height=\"50\"\n" +
                "              style=\"font-size: 0; line-height: 0\"\n" +
                "            ></td>\n" +
                "          </tr>\n" +
                "          <!-- //콘텐츠 영역 간 여백 -->\n" +
                "          <tr>\n" +
                "            <td\n" +
                "              align=\"center\"\n" +
                "              width=\"200\"\n" +
                "              height=\"50\"\n" +
                "              colspan=\"3\"\n" +
                "              bgcolor=\"#efefef\"\n" +
                "              style=\"\n" +
                "                font-family: 'Nanum Gothic', 'Malgun Gothic', 'dotum',\n" +
                "                  'AppleGothic', Helvetica, Arial, Sans-Serif;\n" +
                "                font-size: 22px;\n" +
                "                line-height: 1.6;\n" +
                "                letter-spacing: -1px;\n" +
                "                font-weight: bold;\n" +
                "              \"\n" +
                "            >\n" +
                            code + "\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "        </tbody>\n" +
                "      </table>\n" +
                "    </td>";
    }
}
