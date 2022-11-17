package io.ssafy.p.k7a504.ore.userInput.dto;

import io.ssafy.p.k7a504.ore.page.domain.Page;
import lombok.*;

import java.util.HashMap;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UserInputOfPageResponseDto {
    private Long pageId;
    private String pageName;
    private List<HashMap<String, Object>> inputs;

    @Builder
    public UserInputOfPageResponseDto(Page page, List<HashMap<String, Object>> userInputs){
        this.pageId = page.getId();
        this.pageName = page.getName();
        this.inputs = userInputs;
    }
}
