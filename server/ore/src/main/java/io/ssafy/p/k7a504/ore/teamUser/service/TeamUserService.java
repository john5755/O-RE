package io.ssafy.p.k7a504.ore.teamUser.service;

import io.ssafy.p.k7a504.ore.teamUser.domain.TeamUserRole;
import io.ssafy.p.k7a504.ore.teamUser.dto.TeamInfoResponseDto;
import io.ssafy.p.k7a504.ore.teamUser.dto.UserInfoResponseDto;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface TeamUserService {
    Long beFirstMember(Long userId, Long teamId);
    Long inviteMember(Long id, Long userId, Long teamId);
    List<TeamInfoResponseDto> getTeamList(final Long userId);
    List<UserInfoResponseDto> getUserList(final Long teamId);
    Long changeAuthority(final Long userId, final Long teamId, final TeamUserRole role);
    Long removeMember(final Long userId, final  Long teamId);
    Long leaveTeam(final Long teamId);


}
