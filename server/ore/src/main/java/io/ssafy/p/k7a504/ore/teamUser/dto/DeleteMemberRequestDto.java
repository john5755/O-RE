package io.ssafy.p.k7a504.ore.teamUser.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class DeleteMemberRequestDto {
    @NotBlank
    private Long userId;
    @NotBlank
    private Long teamId;
}
