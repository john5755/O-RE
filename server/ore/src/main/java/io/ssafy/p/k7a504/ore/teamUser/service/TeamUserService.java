package io.ssafy.p.k7a504.ore.teamUser.service;

import io.ssafy.p.k7a504.ore.teamUser.dto.TeamInfoResponseDto;
import io.ssafy.p.k7a504.ore.teamUser.dto.UserInfoResponseDto;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface TeamUserService {
    Long beFirstMember(Long userId, Long teamId);
    Long inviteMember(Long id, Long userId, Long teamId);
    List<TeamInfoResponseDto> getTeamList(final Long userId);
    List<UserInfoResponseDto> getUserList(final Long teamId);
    Long changeAuthority(Long id, Long userId, Long teamId, String role);
    Long removeMember(Long id, Long userId, Long teamId);
    Long leaveTeam(Long userId, Long teamId);


}
