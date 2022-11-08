package io.ssafy.p.k7a504.ore.page.dto;

import io.ssafy.p.k7a504.ore.page.domain.Content;
import io.ssafy.p.k7a504.ore.page.domain.Page;
import lombok.*;

import java.util.HashMap;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class PageDetailResponseDto {
    private Long pageId;
    private Long teamId;
    private String name;
    private String pageStatus;
    private List<HashMap<String,Object>> contents;

    @Builder
    public PageDetailResponseDto(Page page, List<HashMap<String,Object>> contents ){
        this.pageId = page.getId();
        this.teamId = page.getTeam().getId();
        this.name = page.getName();
        this.pageStatus = page.getPageStatus().toString();
        this.contents = contents;
    }
}
