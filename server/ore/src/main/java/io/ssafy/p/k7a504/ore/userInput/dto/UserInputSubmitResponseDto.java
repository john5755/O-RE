package io.ssafy.p.k7a504.ore.userInput.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Map;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserInputSubmitResponseDto {

    private Map<String, Object> input;

    @Builder
    public UserInputSubmitResponseDto(Map<String, Object> input){
        this.input = input;
    }
}
