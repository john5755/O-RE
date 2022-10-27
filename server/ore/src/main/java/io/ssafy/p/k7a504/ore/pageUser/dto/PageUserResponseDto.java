package io.ssafy.p.k7a504.ore.pageUser.dto;

import io.ssafy.p.k7a504.ore.page.domain.Page;
import io.ssafy.p.k7a504.ore.pageUser.domain.PageUser;
import io.ssafy.p.k7a504.ore.pageUser.domain.PageUserRole;
import io.ssafy.p.k7a504.ore.user.domain.User;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class PageUserResponseDto {

    private Long id;
    private User user;
    private PageUserRole role;

    @Builder
    public PageUserResponseDto(PageUser pageUser){
        this.id = pageUser.getId();
        this.user = pageUser.getUser();
        this.role = pageUser.getPageUserRole();
    }
}
