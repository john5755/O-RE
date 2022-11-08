package io.ssafy.p.k7a504.ore.pageUser.dto;

import io.ssafy.p.k7a504.ore.pageUser.domain.PageUser;
import io.ssafy.p.k7a504.ore.pageUser.domain.PageUserRole;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class PageUserResponseDto {

    private Long pageUserId;
    private Long userId;
    private String email;
    private String name;
    private String nickname;
    private String profileImage;
    private PageUserRole pageUserRole;

    @Builder
    public PageUserResponseDto(PageUser pageUser){
        this.pageUserId = pageUser.getId();
        this.userId = pageUser.getUser().getId();
        this.email = pageUser.getUser().getEmail();
        this.name = pageUser.getUser().getName();
        this.nickname = pageUser.getUser().getNickname();
        this.profileImage = pageUser.getUser().getProfileImage();
        this.pageUserRole = pageUser.getPageUserRole();
    }

    public static PageUserResponseDto createDto(PageUser pageUser){
        return new PageUserResponseDto(pageUser);
    }
}
