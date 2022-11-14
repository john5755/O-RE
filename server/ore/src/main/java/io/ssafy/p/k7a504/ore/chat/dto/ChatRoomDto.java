package io.ssafy.p.k7a504.ore.chat.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
public class ChatRoomDto {

    private String roomId;
    private Long teamId;
    private Set<WebSocketSession> sessions = new HashSet<>();
    //WebSocketSession은 Spring에서 Websocket Connection이 맺어진 세션

    public static ChatRoomDto create(Long teamId){
        ChatRoomDto team = new ChatRoomDto();

        team.roomId = UUID.randomUUID().toString();
        team.teamId = teamId;
        return team;
    }
}