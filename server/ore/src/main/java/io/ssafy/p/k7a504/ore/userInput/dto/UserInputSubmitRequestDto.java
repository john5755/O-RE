package io.ssafy.p.k7a504.ore.userInput.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.Map;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UserInputSubmitRequestDto {
    @NotNull
    private Long pageId;

    @NotNull
    private Map<String, Object> input;
}
