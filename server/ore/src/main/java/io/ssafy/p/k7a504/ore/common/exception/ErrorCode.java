package io.ssafy.p.k7a504.ore.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum ErrorCode {

    DUPLICATE_USER_EMAIL(HttpStatus.CONFLICT, 40901,"중복된 사용자 이메일입니다."),
    DUPLICATE_PAGE_USER(HttpStatus.CONFLICT, 40902,"이미 페이지에 존재하는 사용자입니다."),

    NOT_VALID_CERTIFICATION_CODE(HttpStatus.BAD_REQUEST, 40001, "유효하지 않은 인증코드입니다."),
    TEAM_NOT_FOUND(HttpStatus.BAD_REQUEST, 40002, " 팀 정보를 찾을 수 없습니다."),
    USER_NOT_FOUND(HttpStatus.BAD_REQUEST, 40003, " 유저 정보를 찾을 수 없습니다."),
    AUTHORITY_NOT_FOUND(HttpStatus.BAD_REQUEST, 40004, " 권한 정보를 찾을 수 없습니다."),
    PAGE_NOT_FOUND(HttpStatus.BAD_REQUEST, 40005, " 페이지 정보를 찾을 수 없습니다."),
    TEAM_USER_NOT_FOUND(HttpStatus.BAD_REQUEST, 40006, "팀 유저 정보를 찾을 수 없습니다."),
    PAGE_USER_NOT_FOUND(HttpStatus.BAD_REQUEST, 40007, "페이지 유저 정보를 찾을 수 없습니다."),
    NO_AUTH_TO_INVITE(HttpStatus.BAD_REQUEST, 40008, "초대할 수 있는 권한이 없습니다."),
    NO_AUTH_TO_DELETE(HttpStatus.BAD_REQUEST, 40009, "퇴출할 수 있는 권한이 없습니다."),


    NOT_FOUND_CREDENTIALS(HttpStatus.UNAUTHORIZED, 40101, "인증정보가 없습니다.");

    private final HttpStatus status;
    private final int code;
    private final String message;
}
