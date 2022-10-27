package io.ssafy.p.k7a504.ore.user.dto;

import io.ssafy.p.k7a504.ore.user.domain.User;
import io.ssafy.p.k7a504.ore.user.domain.UserRole;
import lombok.Getter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
public class UserSignUpRequestDto {

    @NotBlank @Email(message = "올바른 이메일 형식을 사용해야합니다.")
    private String email;

    @NotBlank @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z]).{8,20}", message = "비밀번호는 영문, 숫자를 포함한 8~20자입니다.")
    private String password;

    @NotBlank @Pattern(regexp = "^[ㄱ-힣]{1,10}$", message = "이름은 한글을 포함한 1~10자입니다.")
    private String name;

    public User toEntityWithOwner(BCryptPasswordEncoder encoder) {
        return User.builder()
                .email(email)
                .password(encoder.encode(password))
                .name(name)
                .nickname(name)
                .role(UserRole.OWNER).build();
    }

}
