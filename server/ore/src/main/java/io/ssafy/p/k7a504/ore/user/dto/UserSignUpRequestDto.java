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

    @NotBlank @Email
    private String email;

    @NotBlank @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z]).{8,20}")
    private String password;

    @NotBlank @Pattern(regexp = "^[ㄱ-힣]{1,10}$")
    private String name;

    @NotBlank @Pattern(regexp = "^[A-Za-z0-9ㄱ-힣_]{1,15}$")
    private String nickname;

    public User toEntityWithOwner(BCryptPasswordEncoder encoder) {
        return User.builder()
                .email(email)
                .password(encoder.encode(password))
                .name(name)
                .nickname(nickname)
                .role(UserRole.OWNER).build();
    }

}
