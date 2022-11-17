package io.ssafy.p.k7a504.ore.pageUser.dto;

import io.ssafy.p.k7a504.ore.pageUser.domain.PageUser;
import io.ssafy.p.k7a504.ore.pageUser.domain.PageUserRole;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class PageOfTeamResponseDto {
    private Long pageId;
    private String name;
    private PageUserRole role;

    @Builder
    public PageOfTeamResponseDto(PageUser pageUser){
        this.pageId = pageUser.getPage().getId();
        this.name = pageUser.getPage().getName();
        this.role = pageUser.getPageUserRole();
    }
}
