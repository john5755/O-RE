package io.ssafy.p.k7a504.ore.chat.service;

import io.ssafy.p.k7a504.ore.chat.dto.ChatRequestDto;
import io.ssafy.p.k7a504.ore.chat.domain.ChatRoom;
import io.ssafy.p.k7a504.ore.chat.dto.CreateChatRequestDto;
import io.ssafy.p.k7a504.ore.chat.dto.EnterRoomRequestDto;
import io.ssafy.p.k7a504.ore.chat.repository.ChatRoomRepository;
import io.ssafy.p.k7a504.ore.common.exception.CustomException;
import io.ssafy.p.k7a504.ore.common.exception.ErrorCode;
import io.ssafy.p.k7a504.ore.team.domain.Team;
import io.ssafy.p.k7a504.ore.team.repository.TeamRepository;
import io.ssafy.p.k7a504.ore.user.domain.User;
import io.ssafy.p.k7a504.ore.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final TeamRepository teamRepository;
    private final UserRepository userRepository;

    @Transactional
    public ChatRoom createRoom(CreateChatRequestDto createChatRequestDto) {
        User user = userRepository.findById(createChatRequestDto.getUserId())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        Team team = teamRepository.getById(createChatRequestDto.getTeamId());
        return chatRoomRepository.save(ChatRoom.create(team));
    }

    @Transactional
    public ChatRoom enterRoom(EnterRoomRequestDto enterRoomRequestDto) {
        User guest = userRepository.findById(enterRoomRequestDto.getUserId())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        ChatRoom chatRoom = chatRoomRepository.findByRoomId(enterRoomRequestDto.getRoomId())
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));
        return chatRoom;
    }

    @Transactional
    public ChatRoom exitRoom(ChatRequestDto chatRequestDto) {
        User user = userRepository.findById(chatRequestDto.getUserId())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        ChatRoom chatRoom = chatRoomRepository.findByRoomId(chatRequestDto.getRoomId())
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));
        return chatRoom;
    }

}
