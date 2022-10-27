package io.ssafy.p.k7a504.ore.team.service;

import io.ssafy.p.k7a504.ore.team.dto.TeamEditRequestDto;
import io.ssafy.p.k7a504.ore.team.dto.TeamRequestDto;
import io.ssafy.p.k7a504.ore.team.dto.TeamResponseDto;

public interface TeamService {
    Long saveTeam(final Long userId, TeamRequestDto teamReqDTO);
    TeamResponseDto getTeam(final Long teamId);
    TeamResponseDto editTeam(final Long teamId, TeamEditRequestDto teamEditReqDTO);
    Long removeTeam(final Long teamId);
}
