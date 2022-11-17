package io.ssafy.p.k7a504.ore.pageUser.dto;

import io.ssafy.p.k7a504.ore.page.domain.Page;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class PageContainInputResponseDto {
    private Long pageId;
    private String name;

    @Builder
    public PageContainInputResponseDto(Page page){
        this.pageId = page.getId();
        this.name = page.getName();
    }
}
