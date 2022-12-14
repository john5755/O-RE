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
    DUPLICATE_PASSWORD(HttpStatus.BAD_REQUEST, 40008, "비밀번호가 변경되기 전과 같습니다."),
    NOT_VALID_PASSWORD(HttpStatus.BAD_REQUEST, 40009, "비밀번호가 일치하지 않습니다."),


    // Team
    TEAM_NOT_FOUND(HttpStatus.BAD_REQUEST, 40031, " 팀 정보를 찾을 수 없습니다."),
    TEAM_USER_NOT_FOUND(HttpStatus.BAD_REQUEST, 40032, "팀 유저 정보를 찾을 수 없습니다."),

    // Page
    PAGE_NOT_FOUND(HttpStatus.BAD_REQUEST, 40051, " 페이지 정보를 찾을 수 없습니다."),
    PAGE_USER_NOT_FOUND(HttpStatus.BAD_REQUEST, 40052, "페이지 유저 정보를 찾을 수 없습니다."),
    PAGE_STATUS_NOT_FOUND(HttpStatus.BAD_REQUEST, 40053, "허용되지 않는 페이지 타입입니다."),
    DUPLICATE_PAGE_HEADER(HttpStatus.BAD_REQUEST, 40054, "중복된 헤더 이름이 있습니다."),

    // JWT
    NOT_FOUND_CREDENTIALS(HttpStatus.UNAUTHORIZED, 40101, "인증정보가 없습니다."),
    NOT_VALID_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, 40102, "유효하지 않은 Refresh Token입니다."),
    NOT_FOUND_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, 40103, "Refresh Token이 존재하지 않습니다."),
    NOT_VALID_ACCESS_TOKEN(HttpStatus.UNAUTHORIZED, 40104, "Access Token이 만료되었습니다."),
    EXPIRED_REFRESH_TOKEN(HttpStatus.UNAUTHORIZED, 40105, "Refresh Token이 만료되었습니다."),

    //권한
    CANT_GIVE_HIGHER_AUTH(HttpStatus.UNAUTHORIZED, 40133, "본인의 권한보다 더 높은 권한을 부여할 수 없습니다."),
    NO_AUTH_TO_INVITE(HttpStatus.UNAUTHORIZED, 40134, "초대할 수 있는 권한이 없습니다."),
    NO_AUTH_TO_DELETE(HttpStatus.UNAUTHORIZED, 40135, "퇴출할 수 있는 권한이 없습니다."),
    NO_AUTH_TO_MODIFY(HttpStatus.UNAUTHORIZED, 40136, "수정할 수 있는 권한이 없습니다."),
    NO_AUTH_TO_CREATE(HttpStatus.UNAUTHORIZED, 40137, "생성할 수 있는 권한이 없습니다."),
    NO_AUTH_TO_SIGN_UP_FOR_OWNER(HttpStatus.UNAUTHORIZED, 40138, "회원가입할 수 있는 권한이 없습니다."),
    NOT_VALID_EMAIL(HttpStatus.UNAUTHORIZED, 40140, "이메일 인증이 완료되지 않았습니다."),
    CANT_BE_OWNER(HttpStatus.UNAUTHORIZED, 40141, "OWNER 권한을 부여할 수 없습니다. "),
    OWNER_CANT_LEAVE(HttpStatus.UNAUTHORIZED, 40142, "OWNER는 떠날 수 없습니다. "),
    NO_AUTH_TO_MODIFY_FOR_YOURSELF(HttpStatus.UNAUTHORIZED, 40143, "본인의 권한을 수정할 수 없습니다."),

    // ETC
    FILE_NOT_FOUND(HttpStatus.BAD_REQUEST, 40081, "파일이 없습니다."),
    NOT_EXCEL_FILE(HttpStatus.BAD_REQUEST, 40082, "Excel 파일이 아닙니다."),
    CANT_CONVERT_TO_JSON(HttpStatus.BAD_REQUEST, 40083, "Json형식으로 바꿀 수 없습니다."),
    CANT_CONVERT_TO_STRING(HttpStatus.BAD_REQUEST, 40084, "String형식으로 바꿀 수 없습니다."),
    CANT_CONVERT_TO_EXCEL(HttpStatus.BAD_REQUEST, 40085, "EXCEL file로 변환할 수 없습니다."),
    DONT_HAVE_TABLE(HttpStatus.BAD_REQUEST, 40086, "해당 페이지는 Table형식을 갖고있지 않습니다.");


    private final HttpStatus status;
    private final int code;
    private final String message;
}
