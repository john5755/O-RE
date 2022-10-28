package io.ssafy.p.k7a504.ore.teamUser.service;

import io.ssafy.p.k7a504.ore.teamUser.domain.TeamUserRole;
import io.ssafy.p.k7a504.ore.teamUser.dto.TeamInfoResponseDto;
import io.ssafy.p.k7a504.ore.teamUser.dto.UserInfoResponseDto;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface TeamUserService {
    Long beFirstMember(Long teamId);
    Long inviteMember(Long userId, Long teamId);
    List<TeamInfoResponseDto> getTeamList();
    List<UserInfoResponseDto> getUserList(Long teamId);
    Long changeAuthority(Long userId, Long teamId, String role);
    Long removeMember(Long userId, Long teamId);
    Long leaveTeam(Long teamId);


}
