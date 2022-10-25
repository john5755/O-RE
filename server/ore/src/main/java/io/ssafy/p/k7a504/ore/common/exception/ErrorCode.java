package io.ssafy.p.k7a504.ore.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum ErrorCode {

    DUPLICATE_USER_EMAIL(HttpStatus.CONFLICT, 40901,"중복된 사용자 이메일입니다."),

    NOT_VALID_CERTIFICATION_CODE(HttpStatus.BAD_REQUEST, 40001, "유효하지 않은 인증코드입니다.");

    private final HttpStatus status;
    private final int code;
    private final String message;
}
