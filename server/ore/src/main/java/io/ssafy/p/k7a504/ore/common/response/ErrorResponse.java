package io.ssafy.p.k7a504.ore.common.response;

import io.ssafy.p.k7a504.ore.common.exception.CustomException;
import io.ssafy.p.k7a504.ore.common.exception.ErrorCode;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Getter
public class ErrorResponse extends BasicResponse {

    private int code;

    public ErrorResponse(ErrorCode errorCode) {
        super(false, errorCode.getMessage());
        this.code = errorCode.getCode();
    }

    public static ResponseEntity toResponseEntity(CustomException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse(e.getErrorCode()));
    }

}
