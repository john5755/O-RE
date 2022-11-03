package io.ssafy.p.k7a504.ore.page.dto;

import io.ssafy.p.k7a504.ore.page.domain.Page;
import io.ssafy.p.k7a504.ore.page.domain.PageStatus;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class PageModifyResponseDto {

    private Long pageId;
    private String name;
    private PageStatus pageStatus;
    private  String content;

    @Builder
    public PageModifyResponseDto(Page page){
        this.pageId = page.getId();
        this.name = page.getName();
        this.pageStatus = page.getPageStatus();
        this.content = page.getContent();
    }
}
