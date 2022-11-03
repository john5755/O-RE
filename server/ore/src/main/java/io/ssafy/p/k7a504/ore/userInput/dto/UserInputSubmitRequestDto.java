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
    //todo : 이거 페이지id는 한번만 보내주고 input만 list로 만들어서 보내주자.
    @NotNull
    Long pageId;

    @NotNull
    Map<String, Object> input;
}
