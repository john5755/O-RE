package io.ssafy.p.k7a504.ore.teamUser.dto;

import io.ssafy.p.k7a504.ore.team.domain.Team;
import io.ssafy.p.k7a504.ore.teamUser.domain.TeamUser;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class TeamInfoResponseDto {
    private Long teamId;
    private String name;
    private String imageUrl;

    @Builder
    public TeamInfoResponseDto(TeamUser teamUser){
        this.teamId=teamUser.getTeam().getId();
        this.name = teamUser.getTeam().getName();
        this.imageUrl = teamUser.getTeam().getImageUrl();
    }

    @Builder
    public TeamInfoResponseDto(Team team){
        this.teamId=team.getId();
        this.name = team.getName();
        this.imageUrl = team.getImageUrl();
    }

}
