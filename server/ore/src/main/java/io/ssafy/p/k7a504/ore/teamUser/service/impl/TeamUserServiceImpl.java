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
import io.ssafy.p.k7a504.ore.user.domain.UserRole;
import io.ssafy.p.k7a504.ore.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
        List<TeamUser> userList = new ArrayList<>();
        User owner = userRepository.findOwner().orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        userList.add(TeamUser.createTeamUser(owner, team, TeamUserRole.OWNER));
        if(user.getRole()!= UserRole.OWNER){
            userList.add(TeamUser.createTeamUser(user, team, TeamUserRole.LEADER));
        }
        teamUserRepository.saveAll(userList);
        return teamId;
    }
    @Override
    @Transactional
    public Long inviteMembers(TeamMemberAddRequestDto teamMemberAddRequestDto) {
        if(teamUserRepository.countByUserIdListAndTeamId(teamMemberAddRequestDto.getUserIdList(), teamMemberAddRequestDto.getTeamId())!=Long.valueOf(0)){
            throw new CustomException(ErrorCode.DUPLICATE_TEAM_USER);
        }
        Long teamId = teamMemberAddRequestDto.getTeamId();
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));

        TeamUser modifier = teamUserRepository.findByUserIdAndTeamId(SecurityUtil.getCurrentUserId(), teamId)
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_USER_NOT_FOUND));
        if(modifier.getRole().getPriority()==1){
            throw new CustomException(ErrorCode.NO_AUTH_TO_INVITE);
        }

        List<TeamUser> teamUserList = new ArrayList<>();
        List<User> userList = userRepository.findByIdIn(teamMemberAddRequestDto.getUserIdList());
        if(userList.size()!=teamMemberAddRequestDto.getUserIdList().size())
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        for(User user: userList){
            TeamUser teamUser = TeamUser.createTeamUser(user, team, TeamUserRole.MEMBER);
            teamUserList.add(teamUser);
        }

        teamUserRepository.saveAll(teamUserList);
        return SecurityUtil.getCurrentUserId();
    }

    @Override
    public Slice<TeamInfoResponseDto> findTeamsUserBelongTo(Pageable pageable){
        return teamUserRepository.findByUserId(SecurityUtil.getCurrentUserId(), pageable)
                .map(TeamInfoResponseDto::new);
    }

    @Override
    public Slice<UserInfoResponseDto> findUsersInTeam(Long teamId, Pageable pageable) {
        Slice<TeamUser> teamUsers = teamUserRepository.findByTeamId(teamId, SecurityUtil.getCurrentUserId(), pageable);
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

        List<Long>teamUserIdList = modifyAuthoritiesParamList.stream().map(ModifyAuthoritiesParamDto::getTeamUserId).collect(Collectors.toList());

        if(teamUserRepository.countById(teamUserIdList)!=Long.valueOf(teamUserIdList.size()))
            throw new CustomException(ErrorCode.TEAM_USER_NOT_FOUND);

        for(ModifyAuthoritiesParamDto modifyAuthoritiesParamDto: modifyAuthoritiesParamList){
            TeamUser member = teamUserRepository.findById(modifyAuthoritiesParamDto.getTeamUserId())
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
    public Long removeMembers(DeleteMemberRequestDto deleteMemberRequestDto) {

        Long teamId = deleteMemberRequestDto.getTeamId();
        if(teamUserRepository.countByTeamUserIdListAndTeamId(deleteMemberRequestDto.getTeamUserIdList(), teamId)!=Long.valueOf(deleteMemberRequestDto.getTeamUserIdList().size())){
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
        TeamUser modifier = teamUserRepository.findByUserIdAndTeamId(SecurityUtil.getCurrentUserId(), teamId)
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_USER_NOT_FOUND));

        if(modifier.getRole()==TeamUserRole.MEMBER) {
            throw new CustomException(ErrorCode.NO_AUTH_TO_MODIFY);
        }else if(modifier.getRole()==TeamUserRole.MANAGER){
            if(teamUserRepository.countRoleOverManager(deleteMemberRequestDto.getTeamUserIdList())>Long.valueOf(0))
                throw new CustomException(ErrorCode.NO_AUTH_TO_MODIFY);
        }else{
            if(teamUserRepository.countRoleOverLeader(deleteMemberRequestDto.getTeamUserIdList())>Long.valueOf(0))
                throw new CustomException(ErrorCode.NO_AUTH_TO_MODIFY);
        }

        teamUserRepository.deleteAllByIdInBatch(deleteMemberRequestDto.getTeamUserIdList());
        return SecurityUtil.getCurrentUserId();
    }

    @Override
    @Transactional
    public Long leaveTeam(Long teamId) {
        User owner = userRepository.findOwner().orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        if(SecurityUtil.getCurrentUserId().equals(owner.getId())) throw new CustomException(ErrorCode.OWNER_CANT_LEAVE);
        TeamUser teamUser = teamUserRepository.findByUserIdAndTeamId(SecurityUtil.getCurrentUserId(), teamId)
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_USER_NOT_FOUND));
        teamUserRepository.delete(teamUser);

        return SecurityUtil.getCurrentUserId();
    }

    @Override
    public Slice<UserInfoResponseDto> findUserByName(String name, Long teamId, Pageable pageable) {
        Slice<TeamUser> teamUsers = teamUserRepository.findTeamUserByUserNameAndTeamId(name, teamId, SecurityUtil.getCurrentUserId(), pageable);
        return teamUsers.map(UserInfoResponseDto::new);
    }

    @Override
    public Slice<UserInfoResponseDto> findUserByNickName(String nickName, Long teamId, Pageable pageable) {
        Slice<TeamUser> teamUsers = teamUserRepository.findTeamUserByUserNicknameAndTeamId(nickName, teamId, SecurityUtil.getCurrentUserId(),pageable);
        return teamUsers.map(UserInfoResponseDto::new);
    }
}
