package io.ssafy.p.k7a504.ore.user.dto;


import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
public class UserSignInRequestDto {

    @NotBlank @Email(message = "이메일 형식을 사용해야합니다.")
    private String email;

    @NotBlank @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z]).{8,20}", message = "비밀번호는 영문, 숫자를 포함한 8~20자입니다.")
    private String password;
}
