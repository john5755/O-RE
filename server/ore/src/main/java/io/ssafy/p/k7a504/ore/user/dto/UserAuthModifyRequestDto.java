package io.ssafy.p.k7a504.ore.user.dto;

import io.ssafy.p.k7a504.ore.user.domain.UserRole;
import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class UserAuthModifyRequestDto {

    @NotNull
    private Long userId;

    private UserRole role;
}
