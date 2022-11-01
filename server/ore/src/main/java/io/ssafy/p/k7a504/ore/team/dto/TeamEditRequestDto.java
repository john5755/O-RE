package io.ssafy.p.k7a504.ore.team.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
public class TeamEditRequestDto {
        @NotNull
        private Long teamId;
        @NotBlank
        private String name;
        private String imageUrl;
}
