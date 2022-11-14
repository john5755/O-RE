package io.ssafy.p.k7a504.ore.chat.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ChatMessageDto {

    private String roomId;
    private String user;
    private String message;
    private LocalDateTime localDateTime;


    public ChatMessageDto(String rooomId, String user, String message) {
        this.user = user;
        this.roomId = rooomId;
        this.message=message;
        this.localDateTime = LocalDateTime.now();
    }
}