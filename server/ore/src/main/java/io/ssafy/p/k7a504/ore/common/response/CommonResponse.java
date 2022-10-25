package io.ssafy.p.k7a504.ore.common.response;

import lombok.Getter;

@Getter
public class CommonResponse<T> extends BasicResponse{

    private T data;

    public CommonResponse(T data) {
        super(true, "success");
        this.data = data;
    }
}
