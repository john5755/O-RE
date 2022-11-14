package io.ssafy.p.k7a504.ore.chat.dto;


import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ChatRequestDto {
    private Long userId;
    private Long teamId;
    private String roomId;
    private String message;
    private LocalDateTime localDateTime;
}
