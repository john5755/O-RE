package io.ssafy.p.k7a504.ore.team.domain;

import io.ssafy.p.k7a504.ore.upload.S3Uploader;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.io.IOException;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private String name;
    private String imageUrl;

    private Team(String name, String imageUrl){
        this.name = name;
        this.imageUrl = imageUrl;
    }

    public static Team createTeam(String name, String imageUrl){
        Team team = new Team(name, imageUrl);
        return team;
    }

    public void modifyTeamInfo(String name, String imageUrl){
        this.name = name;
        this.imageUrl = imageUrl;
    }

    public String  modifyTeamImage(MultipartFile multipartFile, S3Uploader s3Uploader) throws IOException {
        if(!this.getImageUrl().equals(getDefaultImageUrl()))
            s3Uploader.deleteFile(this.getImageUrl());
        return s3Uploader.uploadFiles(multipartFile, "team");
    }

    public static String getDefaultImageUrl() {
        return "https://ore-s3.s3.ap-northeast-2.amazonaws.com/team/TeamDefaultImg.png";
    }


}