package io.ssafy.p.k7a504.ore.team.dto;

import io.ssafy.p.k7a504.ore.team.domain.Team;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class TeamResponseDto {
    private Long teamId;
    private String name;
    private String imageUrl;

    @Builder
    public TeamResponseDto(Team team){
        this.teamId=team.getId();
        this.name = team.getName();
        this.imageUrl = team.getImageUrl();
    }

}
