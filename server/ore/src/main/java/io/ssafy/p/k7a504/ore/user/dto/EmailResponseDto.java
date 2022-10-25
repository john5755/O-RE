package io.ssafy.p.k7a504.ore.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class EmailResponseDto {

    private String email;
    private String code;

    @Builder
    public EmailResponseDto(String email, String code) {
        this.email = email;
        this.code = code;
    }
}
