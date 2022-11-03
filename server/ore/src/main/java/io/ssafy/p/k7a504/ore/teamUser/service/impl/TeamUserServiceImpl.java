package io.ssafy.p.k7a504.ore.teamUser.service.impl;

import io.ssafy.p.k7a504.ore.common.exception.CustomException;
import io.ssafy.p.k7a504.ore.common.exception.ErrorCode;
import io.ssafy.p.k7a504.ore.common.security.SecurityUtil;
import io.ssafy.p.k7a504.ore.team.domain.Team;
import io.ssafy.p.k7a504.ore.team.repository.TeamRepository;
import io.ssafy.p.k7a504.ore.teamUser.domain.TeamUser;
import io.ssafy.p.k7a504.ore.teamUser.domain.TeamUserRole;
import io.ssafy.p.k7a504.ore.teamUser.dto.*;
import io.ssafy.p.k7a504.ore.teamUser.repository.TeamUserRepository;
import io.ssafy.p.k7a504.ore.teamUser.service.TeamUserService;
import io.ssafy.p.k7a504.ore.user.domain.User;
import io.ssafy.p.k7a504.ore.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TeamUserServiceImpl implements TeamUserService {

    private final TeamRepository teamRepository;
    private final UserRepository userRepository;
    private final TeamUserRepository teamUserRepository;

    @Override
    @Transactional
    public Long beFirstMember(Long teamId) {
        User user = userRepository.findById(SecurityUtil.getCurrentUserId())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));
        TeamUser teamUser = TeamUser.createTeamUser(user, team, TeamUserRole.LEADER);
        return teamUserRepository.save(teamUser).getId();
    }
    @Override
    @Transactional
    public Long inviteMember(TeamMemberAddRequestDto teamMemberAddRequestDto) {
        Long userId = teamMemberAddRequestDto.getUserId();
        Long teamId = teamMemberAddRequestDto.getTeamId();
        TeamUser modifier = teamUserRepository.findByUserIdAndTeamId(SecurityUtil.getCurrentUserId(), teamId)
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_USER_NOT_FOUND));
        if(!modifier.checkTeamUserRoleToInviteMember()){
            throw new CustomException(ErrorCode.NO_AUTH_TO_INVITE);
        }
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));
        if(teamUserRepository.existsByUserAndTeam(user, team)){
            throw new CustomException(ErrorCode.DUPLICATE_TEAM_USER);
        }
        TeamUser teamUser = TeamUser.createTeamUser(user, team, TeamUserRole.MEMBER);
        return teamUserRepository.save(teamUser).getId();
    }

    @Override
    public Slice<TeamInfoResponseDto> findTeamsUserBelongTo(Pageable pageable){
        return teamUserRepository.findByUserId(SecurityUtil.getCurrentUserId(), pageable)
                .map(TeamInfoResponseDto::new);
    }

    @Override
    public Slice<UserInfoResponseDto> findUsersInTeam(Long teamId, Pageable pageable) {
        Slice<TeamUser> teamUsers = teamUserRepository.findByTeamId(teamId, pageable);
        if (teamUsers.getNumberOfElements() == 0) {
            throw new CustomException(ErrorCode.TEAM_NOT_FOUND);
        }
        return teamUsers.map(UserInfoResponseDto::new);
    }

    @Override
    @Transactional
    public void changeAuthorites(List<ModifyAuthoritiesParamDto> modifyAuthoritiesParamList, Long teamId) {
        TeamUser modifier = teamUserRepository.findByUserIdAndTeamId(SecurityUtil.getCurrentUserId(), teamId)
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_USER_NOT_FOUND));
        for(ModifyAuthoritiesParamDto modifyAuthoritiesParamDto: modifyAuthoritiesParamList){
            TeamUser member = teamUserRepository.findByUserIdAndTeamId(modifyAuthoritiesParamDto.getUserId(), teamId)
                    .orElseThrow(() -> new CustomException(ErrorCode.TEAM_USER_NOT_FOUND));
            if(!modifier.checkHavingAuthorityOverUser(member)){
                throw new CustomException(ErrorCode.NO_AUTH_TO_MODIFY);
            }
            if(!modifier.checkPriorityOfAuthority(modifyAuthoritiesParamDto.getTeamUserRole())){
                throw new CustomException(ErrorCode.CANT_GIVE_HIGHER_AUTH);
            }
            member.modifyTeamUserAuthority(modifyAuthoritiesParamDto.getTeamUserRole());
        }
    }

    @Override
    @Transactional
    public Long removeMember(Long userId, Long teamId) {
        TeamUser modifier = teamUserRepository.findByUserIdAndTeamId(SecurityUtil.getCurrentUserId(), teamId)
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_USER_NOT_FOUND));
        TeamUser member = teamUserRepository.findByUserIdAndTeamId(userId, teamId)
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_USER_NOT_FOUND));
        if(!modifier.checkHavingAuthorityOverUser(member)){
            throw new CustomException(ErrorCode.NO_AUTH_TO_DELETE);
        }
        teamUserRepository.delete(member);
        return userId;
    }

    @Override
    @Transactional
    public Long leaveTeam(Long teamId) {
        TeamUser teamUser = teamUserRepository.findByUserIdAndTeamId(SecurityUtil.getCurrentUserId(), teamId)
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_USER_NOT_FOUND));
        teamUserRepository.delete(teamUser);

        List<TeamUser> list = teamUserRepository.findByTeamId(teamId);
        if(list.size()==0) teamRepository.deleteById(teamId);

        return SecurityUtil.getCurrentUserId();
    }

}
