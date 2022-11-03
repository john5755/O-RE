package io.ssafy.p.k7a504.ore.page.dto;

import io.ssafy.p.k7a504.ore.page.domain.Page;
import lombok.*;

import java.util.List;
import java.util.Map;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class PageAddResponseDto {
    private Long pageId;
    private Long teamId;
    private String name;
    private String pageStatus;
    private List<Map<String, Object>> content;

    @Builder
    public PageAddResponseDto(Page page, List<Map<String, Object>> content){
        this.pageId = page.getId();
        this.teamId = page.getTeam().getId();
        this.name = page.getName();
        this.pageStatus = page.getPageStatus().toString();
        this.content = content;
    }
}
