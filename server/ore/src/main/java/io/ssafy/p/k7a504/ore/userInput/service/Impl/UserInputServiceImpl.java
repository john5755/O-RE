package io.ssafy.p.k7a504.ore.userInput.service.Impl;

import io.ssafy.p.k7a504.ore.common.exception.CustomException;
import io.ssafy.p.k7a504.ore.common.exception.ErrorCode;
import io.ssafy.p.k7a504.ore.common.security.SecurityUtil;
import io.ssafy.p.k7a504.ore.page.domain.Page;
import io.ssafy.p.k7a504.ore.page.dto.PageOfTeamResponseDto;
import io.ssafy.p.k7a504.ore.page.repository.PageRepository;
import io.ssafy.p.k7a504.ore.pageUser.domain.PageUser;
import io.ssafy.p.k7a504.ore.pageUser.repository.PageUserRepository;
import io.ssafy.p.k7a504.ore.userInput.domain.UserInput;
import io.ssafy.p.k7a504.ore.userInput.dto.UserInputOfPageResponseDto;
import io.ssafy.p.k7a504.ore.userInput.dto.UserInputSubmitRequestDto;
import io.ssafy.p.k7a504.ore.userInput.dto.UserInputSubmitResponseDto;
import io.ssafy.p.k7a504.ore.userInput.repository.UserInputRepository;
import io.ssafy.p.k7a504.ore.userInput.service.UserInputService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class UserInputServiceImpl implements UserInputService {

    private final UserInputRepository userInputRepository;
    private final PageUserRepository pageUserRepository;
    private final PageRepository pageRepository;

    @Override
    @Transactional
    public UserInputSubmitResponseDto userInputSubmit(UserInputSubmitRequestDto userInputSubmitRequestDto) {
        Long pageId = userInputSubmitRequestDto.getPageId();
        Long userId = SecurityUtil.getCurrentUserId();
        String inputValue = userInputSubmitRequestDto.getInput().toString();
        PageUser pageUser = pageUserRepository.findByPageIdAndUserId(pageId, userId)
                .orElseThrow(() -> new CustomException(ErrorCode.PAGE_USER_NOT_FOUND));;
        UserInput userInput = UserInput.userInputSubmit(pageUser, inputValue);
        userInputRepository.save(userInput);
        return new UserInputSubmitResponseDto(userInputSubmitRequestDto.getInput());
    }

    @Override
    public UserInputOfPageResponseDto userInputsOfPage(Long pageId) {
        //todo : 반환 형식 토론
        Page page = pageRepository.findById(pageId)
                .orElseThrow(() -> new CustomException(ErrorCode.PAGE_NOT_FOUND));
        List<UserInput> userInputList = userInputRepository.findAllByPageId(pageId);
        List<String> userInputs = userInputList.stream().map(UserInput::getInputValue).collect(Collectors.toList());
        return new UserInputOfPageResponseDto(page, userInputs);
    }
}
