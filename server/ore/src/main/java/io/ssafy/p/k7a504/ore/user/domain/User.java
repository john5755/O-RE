package io.ssafy.p.k7a504.ore.user.domain;

import lombok.*;

import javax.persistence.*;

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
}
