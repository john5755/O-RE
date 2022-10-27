package io.ssafy.p.k7a504.ore.teamUser.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class DeleteMemberRequestDto {
    private Long userId;
    private Long teamId;
}
