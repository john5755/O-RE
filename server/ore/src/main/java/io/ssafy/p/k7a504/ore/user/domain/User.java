package io.ssafy.p.k7a504.ore.user.domain;

import io.ssafy.p.k7a504.ore.upload.S3Uploader;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.io.IOException;
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
        this.profileImage = getDefaultImageUrl();
    }

    public void changePassword(String newPassword) {
        this.password = newPassword;
    }

    public void initializeProfileImage() {
        this.profileImage = getDefaultImageUrl();
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

    public void modifyProfileImage(MultipartFile multipartFile, S3Uploader s3Uploader) throws IOException {
        if(multipartFile == null)
            return;

        if(!profileImage.equals(getDefaultImageUrl()))
            s3Uploader.deleteFile(profileImage);
        profileImage = s3Uploader.uploadFiles(multipartFile, "user");
    }

    public void modifyProfileNickname(String nickname) {
        this.nickname = nickname;
    }

    public static String getDefaultImageUrl() {
        return "https://ore-s3.s3.ap-northeast-2.amazonaws.com/user/TeamDefaultImg.png";
    }

}
