package io.ssafy.p.k7a504.ore.chat.api;

import io.ssafy.p.k7a504.ore.chat.dto.ChatRequestDto;
import io.ssafy.p.k7a504.ore.chat.domain.ChatRoom;
import io.ssafy.p.k7a504.ore.chat.dto.CreateChatRequestDto;
import io.ssafy.p.k7a504.ore.chat.dto.EnterRoomRequestDto;
import io.ssafy.p.k7a504.ore.chat.redis.RedisSubscriber;
import io.ssafy.p.k7a504.ore.chat.service.ChatRoomService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
public class ChatRoomController {
    private final ChatRoomService chatService;
    private final RedisMessageListenerContainer redisMessageListener;
    private final RedisSubscriber redisSubscriber;

    @Operation(description = "방만들기", method = "POST")
    @PostMapping("/new/room")
    public ResponseEntity<ChatRoom> createRoom(@RequestBody CreateChatRequestDto createChatRequestDto) {
        ChatRoom createdRoom = chatService.createRoom(createChatRequestDto);
        ChannelTopic topic = new ChannelTopic(createdRoom.getRoomId());
        redisMessageListener.addMessageListener(redisSubscriber, topic);
        return ResponseEntity.ok().body(createdRoom);
    }

    @Operation(description = "방입장", method = "POST")
    @PostMapping("/room/enter")
    public ResponseEntity<?> enterRoom(@RequestBody EnterRoomRequestDto enterRoomRequestDto) {
        ChatRoom enteredRoom = chatService.enterRoom(enterRoomRequestDto);
        ChannelTopic topic = ChannelTopic.of(enteredRoom.getRoomId());
        redisMessageListener.addMessageListener(redisSubscriber, topic);
        return ResponseEntity.ok().body(enteredRoom);
    }

    @Operation(description = "방나가기", method = "POST")
    @PostMapping("/room/exit")
    public ResponseEntity<?> exitRoom(@RequestBody ChatRequestDto chatRequestDto) {
        ChatRoom leavedRoom = chatService.exitRoom(chatRequestDto);
        ChannelTopic topic = ChannelTopic.of(leavedRoom.getRoomId());
        redisMessageListener.removeMessageListener(redisSubscriber, topic);
        return ResponseEntity.ok().body(null);
    }

}