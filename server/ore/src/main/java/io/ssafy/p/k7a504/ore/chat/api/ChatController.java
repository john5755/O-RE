package io.ssafy.p.k7a504.ore.chat.api;

import io.ssafy.p.k7a504.ore.chat.dto.ChatMessageDto;
import io.ssafy.p.k7a504.ore.chat.dto.ChatRequestDto;
import io.ssafy.p.k7a504.ore.chat.redis.RedisPublisher;
import io.ssafy.p.k7a504.ore.chat.redis.RedisSubscriber;
import io.ssafy.p.k7a504.ore.chat.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;



@Controller
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessageSendingOperations messagingTemplate;
    private final RedisMessageListenerContainer redisMessageListener;
    private final RedisSubscriber redisSubscriber;
    private final ChatRoomService service;
    private final RedisPublisher redisPublisher;

    @MessageMapping("/chat/messages")
    public void message(ChatRequestDto requestDto) {
        String roomId = requestDto.getRoomId();
        ChatMessageDto message = service.message(requestDto);
        ChannelTopic topic = ChannelTopic.of(roomId);
        redisPublisher.publish(topic, message);
    }
}
