package io.ssafy.p.k7a504.ore.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum ErrorCode {

    DUPLICATE_USER_EMAIL(HttpStatus.CONFLICT, 40901,"중복된 사용자 이메일입니다."),
    DUPLICATE_USER(HttpStatus.CONFLICT, 40902,"중복된 사용자입니다."),
    NOT_VALID_CERTIFICATION_CODE(HttpStatus.BAD_REQUEST, 40001, "유효하지 않은 인증코드입니다."),
    TEAM_NOT_FOUND(HttpStatus.BAD_REQUEST, 40002, " 팀 정보를 찾을 수 없습니다."),
    USER_NOT_FOUND(HttpStatus.BAD_REQUEST, 40003, " 유저 정보를 찾을 수 없습니다."),
    AUTHORITY_NOT_FOUND(HttpStatus.BAD_REQUEST, 40004, " 권한 정보를 찾을 수 없습니다."),
    PAGE_NOT_FOUND(HttpStatus.BAD_REQUEST, 40005, " 페이지 정보를 찾을 수 없습니다."),
    TEAM_USER_NOT_FOUND(HttpStatus.BAD_REQUEST, 40006, "팀 유저 정보를 찾을 수 없습니다."),
    PAGE_USER_NOT_FOUND(HttpStatus.BAD_REQUEST, 40007, "페이지 유저 정보를 찾을 수 없습니다."),

    NOT_FOUND_CREDENTIALS(HttpStatus.UNAUTHORIZED, 40101, "인증정보가 없습니다."),
    NOT_VALID_AUTHORITY(HttpStatus.BAD_REQUEST, 40005, "권한이 없습니다."),
    IMG_NOT_FOUND(HttpStatus.BAD_REQUEST, 400010, "이미지를 찾을 수 없습니다."),
    IMG_NOT_UPLOAD(HttpStatus.BAD_REQUEST, 400011, "이미지를 업로드할 수 없습니다."),
    FILE_SIZE_EXCEED(HttpStatus.BAD_REQUEST, 400012, "업로드 가능한 용량을 초과하였습니다."),
    NOT_VALID_FILE_TYPE(HttpStatus.BAD_REQUEST, 400013, "업로드 가능한 파일 형식이 아닙니다.");

    private final HttpStatus status;
    private final int code;
    private final String message;
}
