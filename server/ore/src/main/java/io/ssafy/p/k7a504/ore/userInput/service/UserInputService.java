package io.ssafy.p.k7a504.ore.userInput.service;

import io.ssafy.p.k7a504.ore.userInput.dto.UserInputOfPageResponseDto;
import io.ssafy.p.k7a504.ore.userInput.dto.UserInputSubmitRequestDto;
import io.ssafy.p.k7a504.ore.userInput.dto.UserInputSubmitResponseDto;

public interface UserInputService {
    UserInputSubmitResponseDto userInputSubmit(UserInputSubmitRequestDto userInputSubmitRequestDto);
    UserInputOfPageResponseDto userInputsOfPage(Long pageId);
}
