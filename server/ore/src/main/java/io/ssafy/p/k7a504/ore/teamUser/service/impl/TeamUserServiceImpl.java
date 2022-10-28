package io.ssafy.p.k7a504.ore.teamUser.service.impl;

import io.ssafy.p.k7a504.ore.common.exception.CustomException;
import io.ssafy.p.k7a504.ore.common.exception.ErrorCode;
import io.ssafy.p.k7a504.ore.common.security.SecurityUtil;
import io.ssafy.p.k7a504.ore.team.domain.Team;
import io.ssafy.p.k7a504.ore.team.repository.TeamRepository;
import io.ssafy.p.k7a504.ore.teamUser.domain.TeamUser;
import io.ssafy.p.k7a504.ore.teamUser.dto.TeamInfoResponseDto;
import io.ssafy.p.k7a504.ore.teamUser.domain.TeamUserRole;
import io.ssafy.p.k7a504.ore.teamUser.dto.UserInfoResponseDto;
import io.ssafy.p.k7a504.ore.teamUser.repository.TeamUserRepository;
import io.ssafy.p.k7a504.ore.teamUser.service.TeamUserService;
import io.ssafy.p.k7a504.ore.user.domain.User;
import io.ssafy.p.k7a504.ore.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        User user = userRepository.findById(SecurityUtil.getCurrentUserId()).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        Team team = teamRepository.findById(teamId).orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));
        TeamUser teamUser = TeamUser.builder()
                .user(user)
                .team(team)
                .role(TeamUserRole.valueOf("LEADER"))
                .build();
        return teamUserRepository.save(teamUser).getId();
    }
    @Override
    @Transactional
    public Long inviteMember(Long userId, Long teamId) {
        TeamUser modifier = teamUserRepository.findByUserIdAndTeamId(SecurityUtil.getCurrentUserId(), teamId).orElseThrow(() -> new CustomException(ErrorCode.TEAM_USER_NOT_FOUND));
        if(modifier.getRole().getPriority()==1){
            throw new CustomException(ErrorCode.NOT_VALID_AUTHORITY);
        }
        User user = userRepository.findById(userId).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        Team team = teamRepository.findById(teamId).orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));
        if(teamUserRepository.existsByUserAndTeam(user, team)){
            throw new CustomException(ErrorCode.DUPLICATE_USER);
        }
        TeamUser teamUser = TeamUser.builder()
                .user(user)
                .team(team)
                .role(TeamUserRole.valueOf("MEMBER"))
                .build();
        return teamUserRepository.save(teamUser).getId();
    }

    @Override
    public List<TeamInfoResponseDto> getTeamList(){
        if(!userRepository.existsById(SecurityUtil.getCurrentUserId())){
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
        return teamUserRepository.findByUserId(SecurityUtil.getCurrentUserId()).stream().map(TeamInfoResponseDto::new).collect(Collectors.toList());
    }

    @Override
    public List<UserInfoResponseDto> getUserList(Long teamId) {
        if(!teamRepository.existsById(teamId)){
            throw new CustomException(ErrorCode.TEAM_NOT_FOUND);
        }
        return teamUserRepository.findByTeamId(teamId).stream().map(UserInfoResponseDto::new).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public Long changeAuthority(Long userId, Long teamId, String role) {
        Team team = teamRepository.findById(teamId).orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));
        TeamUser modifier = teamUserRepository.findByUserIdAndTeamId(SecurityUtil.getCurrentUserId(), team.getId()).orElseThrow(() -> new CustomException(ErrorCode.TEAM_USER_NOT_FOUND));
        TeamUser user = teamUserRepository.findByUserIdAndTeamId(userId, team.getId()).orElseThrow(() -> new CustomException(ErrorCode.TEAM_USER_NOT_FOUND));
        if(modifier.getRole().getPriority()<=user.getRole().getPriority()||getRolePriority(role)>modifier.getRole().getPriority()){
            throw new CustomException(ErrorCode.NOT_VALID_AUTHORITY);
        }
        TeamUserRole teamUserRole = setAuthority(role, modifier);
        user.update(teamUserRole);
        return userId;
    }

    @Override
    @Transactional
    public Long removeMember(Long userId, Long teamId) {
        Team team = teamRepository.findById(teamId).orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));
        TeamUser modifier = teamUserRepository.findByUserIdAndTeamId(SecurityUtil.getCurrentUserId(), team.getId()).orElseThrow(() -> new CustomException(ErrorCode.TEAM_USER_NOT_FOUND));
        TeamUser user = teamUserRepository.findByUserIdAndTeamId(userId, team.getId()).orElseThrow(() -> new CustomException(ErrorCode.TEAM_USER_NOT_FOUND));
        if(modifier.getRole().getPriority()<=user.getRole().getPriority()){
            throw new CustomException(ErrorCode.NOT_VALID_AUTHORITY);
        }
        teamUserRepository.delete(user);
        return userId;
    }

    @Override
    @Transactional
    public Long leaveTeam(Long teamId) {
        TeamUser teamUser = teamUserRepository.findByUserIdAndTeamId(SecurityUtil.getCurrentUserId(), teamId).orElseThrow(() -> new CustomException(ErrorCode.TEAM_USER_NOT_FOUND));
        teamUserRepository.delete(teamUser);
        return SecurityUtil.getCurrentUserId();
    }

    public TeamUserRole setAuthority(String role, TeamUser teamUser){
        TeamUserRole teamUserRole;
        int modifier = teamUser.getRole().getPriority();
        if(role.equals("LEADER")){
            teamUserRole = TeamUserRole.LEADER;
        }else if(role.equals("MANAGER")){
            teamUserRole = TeamUserRole.MANAGER;
        }else if(role.equals("MEMBER")){
            teamUserRole = TeamUserRole.MEMBER;
        }else{
            throw new CustomException(ErrorCode.AUTHORITY_NOT_FOUND);
        }
        return teamUserRole;
    }

    public int getRolePriority(String role){
        int priority = 0;
        if(role.equals("LEADER")){
            priority =3;
        }else if(role.equals("MANAGER")){
            priority =2;
        }else if(role.equals("MEMBER")){
            priority =1;
        }else{
            throw new CustomException(ErrorCode.AUTHORITY_NOT_FOUND);
        }
        return priority;
    }
}
