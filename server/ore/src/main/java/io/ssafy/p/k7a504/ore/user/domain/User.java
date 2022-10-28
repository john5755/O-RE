package io.ssafy.p.k7a504.ore.user.domain;

import lombok.*;

import javax.persistence.*;
import java.util.Map;

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private String email;
    private String password;

    private String name;
    private String nickname;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    private String profileImage;

    @Builder
    public User(String email, String password, String name, String nickname, UserRole role) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.nickname = nickname;
        this.role = role;
        this.profileImage = "defaultImageUrl";
    }

    public void changePassword(String newPassword) {
        this.password = newPassword;
    }

    public static User mapToUser(Map<String, Object> map) {
        return User.builder()
                .email(map.get("email").toString())
                .password(map.get("password").toString())
                .name(map.get("name").toString())
                .nickname(map.get("name").toString())
                .role(UserRole.valueOf(map.get("role").toString()))
                .build();
    }

}
