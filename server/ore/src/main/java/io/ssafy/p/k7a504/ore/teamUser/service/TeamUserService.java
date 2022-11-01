package io.ssafy.p.k7a504.ore.teamUser.service;

import io.ssafy.p.k7a504.ore.teamUser.domain.TeamUserRole;
import io.ssafy.p.k7a504.ore.teamUser.dto.ModifyAuthorityRequestDto;
import io.ssafy.p.k7a504.ore.teamUser.dto.TeamInfoResponseDto;
import io.ssafy.p.k7a504.ore.teamUser.dto.TeamMemberAddRequestDto;
import io.ssafy.p.k7a504.ore.teamUser.dto.UserInfoResponseDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface TeamUserService {
    Long beFirstMember(Long teamId);
    Long inviteMember(TeamMemberAddRequestDto teamMemberAddRequestDto);
    Slice<TeamInfoResponseDto> findTeamsUserBelongTo(Pageable pageable);
    Slice<UserInfoResponseDto> findUsersInTeam(Long teamId, Pageable pageable);
    Long grantAuthority(ModifyAuthorityRequestDto modifyAuthorityRequestDto, TeamUserRole role);
    Long removeMember(Long userId, Long teamId);
    Long leaveTeam(Long teamId);


}
