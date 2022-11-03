package io.ssafy.p.k7a504.ore.userInput.service.Impl;

import io.ssafy.p.k7a504.ore.common.exception.CustomException;
import io.ssafy.p.k7a504.ore.common.exception.ErrorCode;
import io.ssafy.p.k7a504.ore.common.security.SecurityUtil;
import io.ssafy.p.k7a504.ore.page.dto.PageOfTeamResponseDto;
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

    @Override
    @Transactional
    public UserInputSubmitResponseDto userInputSubmit(UserInputSubmitRequestDto userInputSubmitRequestDto) {
        Long pageId = userInputSubmitRequestDto.getPageId();
        Long userId = SecurityUtil.getCurrentUserId();
        String inputvalue = userInputSubmitRequestDto.getInput().toString();
        PageUser pageUser = pageUserRepository.findByPageIdAndUserId(pageId, userId)
                .orElseThrow(() -> new CustomException(ErrorCode.PAGE_USER_NOT_FOUND));;
        UserInput userInput = UserInput.userInputSubmit(pageUser, inputvalue);
        userInputRepository.save(userInput);
        return new UserInputSubmitResponseDto(userInputSubmitRequestDto.getInput());
    }

    @Override
    public List<UserInputOfPageResponseDto> userInputsOfPage(Long pageId) {
        List<UserInput> userinputList = userInputRepository.findAllByPageId(pageId);
        return userinputList.stream().map(UserInputOfPageResponseDto::new).collect(Collectors.toList());
    }
}
