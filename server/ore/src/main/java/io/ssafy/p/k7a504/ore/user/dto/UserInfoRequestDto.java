package io.ssafy.p.k7a504.ore.user.dto;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
public class UserInfoRequestDto {

    @NotBlank @Email(message = "올바른 이메일 형식을 사용해야합니다.")
    private String email;

    @NotBlank @Pattern(regexp = "^[ㄱ-힣]{1,10}$", message = "이름은 한글을 포함한 1~10자입니다.")
    private String name;
}
