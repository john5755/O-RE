package io.ssafy.p.k7a504.ore.userInput.api;

import io.ssafy.p.k7a504.ore.common.response.BasicResponse;
import io.ssafy.p.k7a504.ore.common.response.CommonResponse;
import io.ssafy.p.k7a504.ore.userInput.dto.UserInputSubmitRequestDto;
import io.ssafy.p.k7a504.ore.userInput.service.UserInputService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user-input")
public class UserInputController {

    private final UserInputService userInputService;

    @PostMapping("")
    public ResponseEntity<? extends BasicResponse> userInputSubmit(@RequestBody @Valid UserInputSubmitRequestDto userInputSubmitRequestDto) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(userInputService.userInputSubmit(userInputSubmitRequestDto)));
    }

    @GetMapping("/list/{pageId}")
    public ResponseEntity<? extends BasicResponse> userInputsOfPage(@PathVariable Long pageId) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(userInputService.userInputsOfPage(pageId)));
    }

}
