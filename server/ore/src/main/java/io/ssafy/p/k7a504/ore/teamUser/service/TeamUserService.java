package io.ssafy.p.k7a504.ore.teamUser.service;

import io.ssafy.p.k7a504.ore.teamUser.domain.TeamUserRole;
import io.ssafy.p.k7a504.ore.teamUser.dto.*;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;

public interface TeamUserService {
    Long beFirstMember(Long teamId);
    Long inviteMembers(TeamMemberAddRequestDto teamMemberAddRequestDto);
    Slice<TeamInfoResponseDto> findTeamsUserBelongTo(Pageable pageable);
    Slice<UserInfoResponseDto> findUsersInTeam(Long teamId, Pageable pageable);
    void changeAuthorites(List<ModifyAuthoritiesParamDto> modifyAuthoritiesParamList, Long teamId);
    Long removeMembers(DeleteMemberRequestDto deleteMemberRequestDto);
    Long leaveTeam(Long teamId);

    List<UserInfoResponseDto> findUserByName(String name, Long teamId);
    List<UserInfoResponseDto> findUserByNickName(String nickName, Long teamId);

}
