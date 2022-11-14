package io.ssafy.p.k7a504.ore.chat.api;

import io.ssafy.p.k7a504.ore.chat.RedisSubscriber;
import io.ssafy.p.k7a504.ore.chat.dto.ChatMessageDto;
import io.ssafy.p.k7a504.ore.user.domain.User;
import io.ssafy.p.k7a504.ore.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final EnterRoomService enterRoomService;
    private final RedisMessageListenerContainer redisMessageListener;
    private final RedisSubscriber redisSubscriber;

    @ResponseBody
    @PostMapping("/api/room/enter")
    public ResponseEntity<?> enterRoom(@RequestBody ChatRoomDTO chatRoomDTO){
        EnterRoom enterRoom = enterRoomService.enterRoom(chatRoomDTO);

        ChannelTopic topic = new ChannelTopic(enterRoom.getRoom().getRoomId());
        redisMessageListener.addMessageListener(redisSubscriber,topic);
        return ResponseEntity.ok().body(enterRoom);
    }
}
