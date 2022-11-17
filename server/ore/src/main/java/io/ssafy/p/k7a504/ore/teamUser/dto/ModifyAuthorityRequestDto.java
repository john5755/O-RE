package io.ssafy.p.k7a504.ore.teamUser.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
public class ModifyAuthorityRequestDto {
    @NotNull
    private Long teamUserId;
    @NotBlank
    private String role;
}
