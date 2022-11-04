package io.ssafy.p.k7a504.ore.teamUser.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class TeamMemberAddRequestDto {
    @NotNull
    private Long teamId;
    @NotNull
    private List<Long> userList;
}
