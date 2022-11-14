package io.ssafy.p.k7a504.ore.chat.repository;

import io.ssafy.p.k7a504.ore.chat.dto.ChatRoomDto;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.*;

@Repository
public class ChatRoomRepository {
    private Map<String, ChatRoomDto> chatRoomDtoMap;

    @PostConstruct
    private void init(){
        chatRoomDtoMap = new LinkedHashMap<>();
    }

    public List<ChatRoomDto> findAllRooms(){
        List<ChatRoomDto> result = new ArrayList<>(chatRoomDtoMap.values());
        Collections.reverse(result);
        return result;
    }

    public ChatRoomDto findRoomById(String roomId){
        return chatRoomDtoMap.get(roomId);
    }

    public ChatRoomDto createChatRoomDTO(Long teamId){
        ChatRoomDto room = ChatRoomDto.create(teamId);
        chatRoomDtoMap.put(room.getRoomId(), room);
        return room;
    }
}
