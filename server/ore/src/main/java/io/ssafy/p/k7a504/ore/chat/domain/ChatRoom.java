package io.ssafy.p.k7a504.ore.chat.domain;

import io.ssafy.p.k7a504.ore.team.domain.Team;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.UUID;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roomId;

    @ManyToOne(fetch = FetchType.LAZY)
    @OnDelete(action= OnDeleteAction.CASCADE)
    @JoinColumn(name="team_id")
    private Team team;

    public static ChatRoom create(Team team){
        ChatRoom chatroom = new ChatRoom();
        chatroom.roomId = UUID.randomUUID().toString();
        chatroom.team = team;
        return chatroom;
    }

}