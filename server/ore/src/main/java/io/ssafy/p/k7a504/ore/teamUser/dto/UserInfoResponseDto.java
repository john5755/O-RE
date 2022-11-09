package io.ssafy.p.k7a504.ore.teamUser.dto;

import io.ssafy.p.k7a504.ore.teamUser.domain.TeamUser;
import io.ssafy.p.k7a504.ore.teamUser.domain.TeamUserRole;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserInfoResponseDto {
    private Long userId;
    private String name;
    private String nickName;
    private String email;
    private String profileImage;
    private TeamUserRole role;

    @Builder
    public UserInfoResponseDto(TeamUser teamUser){
        this.userId = teamUser.getUser().getId();
        this.name = teamUser.getUser().getName();
        this.nickName = teamUser.getUser().getNickname();
        this.email = teamUser.getUser().getEmail();
        this.profileImage = teamUser.getUser().getProfileImage();
        this.role = teamUser.getRole();
    }
    public static UserInfoResponseDto toUserResponseDto(TeamUser teamUser) {
        return UserInfoResponseDto.builder()
                .teamUser(teamUser)
                .build();
    }
}
