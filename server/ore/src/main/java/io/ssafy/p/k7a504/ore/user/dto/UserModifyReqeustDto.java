package io.ssafy.p.k7a504.ore.user.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
public class UserModifyReqeustDto {

    @Pattern(regexp = "^[ㄱ-힣a-zA-Z_\\-\\[\\]]{1,20}$", message = "닉네임은 1~20자입니다.")
    private String nickname;

    @NotBlank
    private String imageUrl;

}
