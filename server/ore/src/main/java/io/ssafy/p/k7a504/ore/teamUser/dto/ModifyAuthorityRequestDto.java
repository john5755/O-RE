package io.ssafy.p.k7a504.ore.teamUser.dto;

import io.ssafy.p.k7a504.ore.teamUser.domain.TeamUserRole;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class ModifyAuthorityRequestDto {
    @NotNull
    private Long userId;
    @NotBlank
    private String role;
}
