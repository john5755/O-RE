package io.ssafy.p.k7a504.ore.teamUser.dto;

import io.ssafy.p.k7a504.ore.teamUser.domain.TeamUser;
import io.ssafy.p.k7a504.ore.teamUser.domain.TeamUserRole;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UserInfoResponseDto {
    private Long userId;
    private String name;
    private String nickName;
    private String email;
    private TeamUserRole role;

    @Builder
    public UserInfoResponseDto(TeamUser teamUser){
        this.userId = teamUser.getUser().getId();
        this.name = teamUser.getUser().getName();
        this.nickName = teamUser.getUser().getNickname();
        this.email = teamUser.getUser().getEmail();
        this.role = teamUser.getRole();
    }
}
