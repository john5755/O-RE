package io.ssafy.p.k7a504.ore.chat.api;

import io.ssafy.p.k7a504.ore.chat.dto.ChatMessageDto;
import io.ssafy.p.k7a504.ore.user.domain.User;
import io.ssafy.p.k7a504.ore.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final ChatMessageService chatMessageService;
    private final UserRepository userRepository;

    @MessageMapping("/chat/message")
    public void message(
            ChatMessageRequest chatMessageRequest
    ) {
        User user = userRepository.findById(chatMessageRequest.getUserId()).orElseThrow(UserNotFoundException::new);

        chatMessageService.sendMessage(chatMessageRequest, user);
    }
}
