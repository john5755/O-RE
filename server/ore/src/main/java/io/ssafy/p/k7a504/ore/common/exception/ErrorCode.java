package io.ssafy.p.k7a504.ore.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum ErrorCode {

    // User
    DUPLICATE_USER_EMAIL(HttpStatus.CONFLICT, 40901,"중복된 사용자 이메일입니다."),
    DUPLICATE_PAGE_USER(HttpStatus.CONFLICT, 40902,"이미 페이지에 존재하는 사용자입니다."),
    DUPLICATE_TEAM_USER(HttpStatus.CONFLICT, 40903,"이미 팀에 존재하는 사용자입니다."),
    NOT_VALID_CERTIFICATION_CODE(HttpStatus.BAD_REQUEST, 40001, "유효하지 않은 인증코드입니다."),

    USER_NOT_FOUND(HttpStatus.BAD_REQUEST, 40002, " 유저 정보를 찾을 수 없습니다."),
    AUTHORITY_NOT_FOUND(HttpStatus.BAD_REQUEST, 40003, " 권한 정보를 찾을 수 없습니다."),
    NOT_VALID_USER_ROLE(HttpStatus.BAD_REQUEST, 40004, "유효한 USER_ROLE이 아닙니다."),
    NO_EMPTY_KEYWORD(HttpStatus.BAD_REQUEST, 40007, "검색어를 입력해야합니다."),


    // Team
    TEAM_NOT_FOUND(HttpStatus.BAD_REQUEST, 40031, " 팀 정보를 찾을 수 없습니다."),
    TEAM_USER_NOT_FOUND(HttpStatus.BAD_REQUEST, 40032, "팀 유저 정보를 찾을 수 없습니다."),

    // Page
    PAGE_NOT_FOUND(HttpStatus.BAD_REQUEST, 40051, " 페이지 정보를 찾을 수 없습니다."),
    PAGE_USER_NOT_FOUND(HttpStatus.BAD_REQUEST, 40052, "페이지 유저 정보를 찾을 수 없습니다."),

    // JWT
    NOT_FOUND_CREDENTIALS(HttpStatus.UNAUTHORIZED, 40101, "인증정보가 없습니다."),

    //권한
    NO_AUTH_TO_INVITE_PAGE(HttpStatus.UNAUTHORIZED, 40130, "페이지에 초대할 수 있는 권한이 없습니다."),
    NO_AUTH_TO_DELETE_PAGE(HttpStatus.UNAUTHORIZED, 40131, "페이지에 퇴출할 수 있는 권한이 없습니다."),
    NO_AUTH_TO_MODIFY_PAGE_USER_AUTH(HttpStatus.UNAUTHORIZED, 40132, "해당 페이지 유저의 권한을 변경할 수 있는 권한이 없습니다."),
    CANT_GIVE_HIGHER_AUTH(HttpStatus.UNAUTHORIZED, 40133, "본인의 권한보다 더 높은 권한을 부여할 수 없습니다."),
    NO_AUTH_TO_INVITE(HttpStatus.UNAUTHORIZED, 40134, "초대할 수 있는 권한이 없습니다."),
    NO_AUTH_TO_DELETE(HttpStatus.UNAUTHORIZED, 40135, "퇴출할 수 있는 권한이 없습니다."),
    NO_AUTH_TO_MODIFY(HttpStatus.UNAUTHORIZED, 40136, "수정할 수 있는 권한이 없습니다."),
    NO_AUTH_TO_CREATE(HttpStatus.UNAUTHORIZED, 40137, "생성할 수 있는 권한이 없습니다."),
    NO_AUTH_TO_SIGN_UP_FOR_OWNER(HttpStatus.UNAUTHORIZED, 40138, "회원가입할 수 있는 권한이 없습니다."),

    // ETC
    FILE_NOT_FOUND(HttpStatus.BAD_REQUEST, 40081, "파일이 없습니다."),
    NOT_EXCEL_FILE(HttpStatus.BAD_REQUEST, 40082, "Excel 파일이 아닙니다.");

    private final HttpStatus status;
    private final int code;
    private final String message;
}
