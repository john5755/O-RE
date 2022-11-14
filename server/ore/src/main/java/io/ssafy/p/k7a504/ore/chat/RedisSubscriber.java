package io.ssafy.p.k7a504.ore.chat;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.ssafy.p.k7a504.ore.chat.dto.ChatMessageDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class RedisSubscriber implements MessageListener {
    private final ObjectMapper objectMapper;
    private final RedisTemplate redisTemplate;
    private final SimpMessageSendingOperations messagingTemplate;

    @Override
    public void onMessage(Message message, byte[] pattern) {
        try{
            String publicshMessage = (String) redisTemplate.getStringSerializer().deserialize(message.getBody());
            ChatMessageDto chatDTO = objectMapper.readValue(publicshMessage,ChatDTO.class);

            switch(chatDTO.getMsgType()){
                case "chat":
                    messagingTemplate.convertAndSend("/sub/chat/room/"+chatDTO.getRoomId(),chatDTO);
                    break;
                case "createRoom":
                    messagingTemplate.convertAndSend("/sub/room/create",chatDTO);
                    break;
                case "messageAll":
                    messagingTemplate.convertAndSend("/sub/chat/all",chatDTO);
                    break;
            }


        }catch(Exception e){
            log.error(e.getMessage());
        }
    }

}
