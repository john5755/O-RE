package io.ssafy.p.k7a504.ore.userInput.dto;

import io.ssafy.p.k7a504.ore.userInput.domain.UserInput;
import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UserInputOfPageResponseDto {
    private Long pageId;
    private String pageName;
    private String inputs;

    @Builder
    public UserInputOfPageResponseDto(UserInput userInput){
        this.pageId = userInput.getPage().getId();
        this.pageName = userInput.getPage().getName();
        this.inputs = userInput.getInputValue();
    }
}
