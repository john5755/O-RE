package io.ssafy.p.k7a504.ore.userInput.dto;

import io.ssafy.p.k7a504.ore.page.domain.Page;
import io.ssafy.p.k7a504.ore.userInput.domain.UserInput;
import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UserInputOfPageResponseDto {
    private Long pageId;
    private String pageName;
    private List<String> inputs;

    @Builder
    public UserInputOfPageResponseDto(Page page, List<String> userInputs){
        this.pageId = page.getId();
        this.pageName = page.getName();
        this.inputs = userInputs;
    }
}
