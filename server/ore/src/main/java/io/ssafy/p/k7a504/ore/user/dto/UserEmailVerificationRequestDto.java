package io.ssafy.p.k7a504.ore.user.dto;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
public class UserEmailVerificationRequestDto {

    @NotBlank @Email(message = "올바른 이메일 형식을 사용해야합니다.")
    private String email;

    @NotBlank
    private String code;

}
