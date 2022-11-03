package io.ssafy.p.k7a504.ore.userInput.service;

import io.ssafy.p.k7a504.ore.userInput.dto.UserInputOfPageResponseDto;
import io.ssafy.p.k7a504.ore.userInput.dto.UserInputSubmitRequestDto;
import io.ssafy.p.k7a504.ore.userInput.dto.UserInputSubmitResponseDto;

import java.util.List;

public interface UserInputService {
    UserInputSubmitResponseDto userInputSubmit(UserInputSubmitRequestDto userInputSubmitRequestDto);
    List<UserInputOfPageResponseDto> userInputsOfPage(Long pageId);
}
