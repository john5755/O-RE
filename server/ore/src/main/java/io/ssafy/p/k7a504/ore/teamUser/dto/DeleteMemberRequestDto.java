package io.ssafy.p.k7a504.ore.teamUser.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class DeleteMemberRequestDto {
    @NotNull
    private Long userId;
    @NotNull
    private Long teamId;
}
