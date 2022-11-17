package io.ssafy.p.k7a504.ore.user.dto;

import io.ssafy.p.k7a504.ore.user.domain.User;
import io.ssafy.p.k7a504.ore.user.domain.UserRole;
import lombok.Builder;
import lombok.Getter;

@Getter
public class UserInfoResponseDto {
    private String email;
    private String name;
    private String nickname;
    private UserRole role;
    private String profileImage;

    @Builder
    public UserInfoResponseDto(String email, String name, String nickname, UserRole role, String profileImage) {
        this.email = email;
        this.name = name;
        this.nickname = nickname;
        this.role = role;
        this.profileImage = profileImage;
    }

    public static UserInfoResponseDto toResponseDto(User user) {
        return UserInfoResponseDto.builder()
                .email(user.getEmail())
                .name(user.getName())
                .nickname(user.getNickname())
                .role(user.getRole())
                .profileImage(user.getProfileImage()).build();
    }
}
