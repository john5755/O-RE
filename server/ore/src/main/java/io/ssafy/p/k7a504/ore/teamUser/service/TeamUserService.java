package io.ssafy.p.k7a504.ore.teamUser.service;

import io.ssafy.p.k7a504.ore.teamUser.dto.TeamInfoResponseDto;

import java.util.List;

public interface TeamUserService {
    Long addMember(Long userId, Long teamId, String role);
    List<TeamInfoResponseDto> getTeamList(final Long userId);
}
