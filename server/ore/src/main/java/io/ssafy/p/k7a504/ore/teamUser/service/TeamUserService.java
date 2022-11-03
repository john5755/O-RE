package io.ssafy.p.k7a504.ore.teamUser.service;

import io.ssafy.p.k7a504.ore.teamUser.domain.TeamUserRole;
import io.ssafy.p.k7a504.ore.teamUser.dto.*;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface TeamUserService {
    Long beFirstMember(Long teamId);
    Long inviteMember(TeamMemberAddRequestDto teamMemberAddRequestDto);
    Slice<TeamInfoResponseDto> findTeamsUserBelongTo(Pageable pageable);
    Slice<UserInfoResponseDto> findUsersInTeam(Long teamId, Pageable pageable);
    void changeAuthorites(List<ModifyAuthoritiesParamDto> modifyAuthoritiesParamList, Long teamId);
    Long removeMember(Long userId, Long teamId);
    Long leaveTeam(Long teamId);


}
