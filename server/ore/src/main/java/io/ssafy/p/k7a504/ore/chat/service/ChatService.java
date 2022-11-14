package io.ssafy.p.k7a504.ore.chat.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ChatService {
    @Transactional
    public void sendMessage(ChatMessageRequest chatMessageRequest, User user) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatMessageRequest.getRoomId()).orElseThrow(ChatRoomNotFoundException::new);

        //채팅 생성 및 저장
        ChatMessage chatMessage = ChatMessage.builder()
                .chatRoom(chatRoom)
                .user(user)
                .message(chatMessageRequest.getMessage())
                .build();

        chatMessageRepository.save(chatMessage);
        String topic = channelTopic.getTopic();

        // ChatMessageRequest에 유저정보, 현재시간 저장
        chatMessageRequest.setNickName(user.getNickname());
        chatMessageRequest.setUserId(user.getId());

        if (chatMessageRequest.getType() == ChatMessageRequest.MessageType.TALK) {
            // 그륩 채팅일 경우
            redisTemplate.convertAndSend(topic, chatMessageRequest);
        }
    }
}
