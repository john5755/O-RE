package io.ssafy.p.k7a504.ore.user.dto;

import lombok.Getter;

import javax.validation.constraints.Pattern;

@Getter
public class UserModifyReqeustDto {

    @Pattern(regexp = "^[ㄱ-힣a-zA-Z_\\-\\[\\]]{1,20}$", message = "닉네임은 1~20자입니다.")
    private String nickname;

    @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z]).{8,20}", message = "비밀번호는 영문, 숫자를 포함한 8~20자입니다.")
    private String password;

}
