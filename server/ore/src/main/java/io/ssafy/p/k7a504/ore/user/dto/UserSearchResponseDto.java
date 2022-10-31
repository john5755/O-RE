package io.ssafy.p.k7a504.ore.user.dto;

import io.ssafy.p.k7a504.ore.user.domain.User;
import io.ssafy.p.k7a504.ore.user.domain.UserRole;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class UserSearchResponseDto {

    private Long id;
    private String email;
    private String name;
    private String nickname;
    private UserRole role;
    private String profileImage;

    @Builder
    public UserSearchResponseDto(Long id, String email, String name, String nickname, UserRole role, String profileImage) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.nickname = nickname;
        this.role = role;
        this.profileImage = profileImage;
    }

    public static UserSearchResponseDto toResponseDto(User user) {
        return UserSearchResponseDto.builder()
                .id(user.getId())
                .email(user.getEmail())
                .name(user.getName())
                .nickname(user.getNickname())
                .role(user.getRole())
                .profileImage(user.getProfileImage())
                .build();
    }
}
