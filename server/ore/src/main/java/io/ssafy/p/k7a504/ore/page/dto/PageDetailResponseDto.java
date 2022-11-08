package io.ssafy.p.k7a504.ore.page.dto;

import io.ssafy.p.k7a504.ore.page.domain.Page;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class PageDetailResponseDto {
    private Long pageId;
    private Long teamId;
    private String name;
    private String pageStatus;
    private String content;

    @Builder
    public PageDetailResponseDto(Page page){
        this.pageId = page.getId();
        this.teamId = page.getTeam().getId();
        this.name = page.getName();
        this.pageStatus = page.getPageStatus().toString();
        this.content = page.getContent();
    }
}
