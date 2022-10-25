package io.ssafy.p.k7a504.ore.common.exception;

import lombok.Getter;

@Getter
public class CustomException extends RuntimeException{
    ErrorCode errorCode;

    public CustomException(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }
}
