package io.ssafy.p.k7a504.ore.teamUser.dto;

import io.ssafy.p.k7a504.ore.teamUser.domain.TeamUser;
import io.ssafy.p.k7a504.ore.teamUser.domain.TeamUserRole;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class TeamInfoResponseDto {
    private Long teamId;
    private String name;
    private String imageUrl;
    private TeamUserRole teamUserRole;
    @Builder
    public TeamInfoResponseDto(TeamUser teamUser){
        this.teamId=teamUser.getTeam().getId();
        this.name = teamUser.getTeam().getName();
        this.imageUrl = teamUser.getTeam().getImageUrl();
        this.teamUserRole = teamUser.getRole();
    }
}
