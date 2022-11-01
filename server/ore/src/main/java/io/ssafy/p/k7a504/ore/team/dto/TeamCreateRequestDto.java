package io.ssafy.p.k7a504.ore.team.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
public class TeamCreateRequestDto {
    @NotBlank
    private String name;
}
