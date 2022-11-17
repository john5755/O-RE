package io.ssafy.p.k7a504.ore.user.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserPasswordRequestDto {

    @NotBlank @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z]).{8,20}", message = "비밀번호는 영문, 숫자를 포함한 8~20자입니다.")
    private String oldPassword;

    @NotBlank @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z]).{8,20}", message = "비밀번호는 영문, 숫자를 포함한 8~20자입니다.")
    private String newPassword;


}
