package io.ssafy.p.k7a504.ore.teamUser.service.impl;

import io.ssafy.p.k7a504.ore.common.exception.CustomException;
import io.ssafy.p.k7a504.ore.common.exception.ErrorCode;
import io.ssafy.p.k7a504.ore.common.security.SecurityUtil;
import io.ssafy.p.k7a504.ore.team.domain.Team;
import io.ssafy.p.k7a504.ore.team.repository.TeamRepository;
import io.ssafy.p.k7a504.ore.teamUser.domain.TeamUser;
import io.ssafy.p.k7a504.ore.teamUser.dto.ModifyAuthorityRequestDto;
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
        User user = userRepository.findById(SecurityUtil.getCurrentUserId())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));
        TeamUser teamUser = null;
        teamUser.createTeamUser(user, team, TeamUserRole.LEADER);
        return teamUserRepository.save(teamUser).getId();
    }
    @Override
    @Transactional
    public Long inviteMember(Long userId, Long teamId) {
        TeamUser modifier = teamUserRepository.findByUserIdAndTeamId(SecurityUtil.getCurrentUserId(), teamId)
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_USER_NOT_FOUND));
        if(modifier.getRole().getPriority()==1){
            throw new CustomException(ErrorCode.NO_AUTH_TO_INVITE);
        }
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));
        if(teamUserRepository.existsByUserAndTeam(user, team)){
            throw new CustomException(ErrorCode.DUPLICATE_TEAM_USER);
        }
        TeamUser teamUser = null;
        teamUser.createTeamUser(user, team, TeamUserRole.MEMBER);
        return teamUserRepository.save(teamUser).getId();
    }

    @Override
    public List<TeamInfoResponseDto> getTeamList(){
        if(!userRepository.existsById(SecurityUtil.getCurrentUserId())){
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }
        return teamUserRepository.findByUserId(SecurityUtil.getCurrentUserId())
                .stream().map(TeamInfoResponseDto::new).collect(Collectors.toList());
    }

    @Override
    public List<UserInfoResponseDto> getUserList(Long teamId) {
        if(!teamRepository.existsById(teamId)){
            throw new CustomException(ErrorCode.TEAM_NOT_FOUND);
        }
        return teamUserRepository.findByTeamId(teamId)
                .stream().map(UserInfoResponseDto::new).collect(Collectors.toList());
    }


    @Override
    @Transactional
    public Long changeAuthority(ModifyAuthorityRequestDto modifyAuthorityRequestDto, TeamUserRole role) {
        Team team = teamRepository.findById(modifyAuthorityRequestDto.getTeamId())
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));
        TeamUser modifier = teamUserRepository.findByUserIdAndTeamId(SecurityUtil.getCurrentUserId(), team.getId())
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_USER_NOT_FOUND));
        TeamUser user = teamUserRepository.findByUserIdAndTeamId(modifyAuthorityRequestDto.getUserId(), team.getId())
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_USER_NOT_FOUND));
        if(modifier.getRole().getPriority()<=user.getRole().getPriority()||role.getPriority()>modifier.getRole().getPriority()){
            throw new CustomException(ErrorCode.NO_AUTH_TO_MODIFY);
        }
        user.modifyTeamUserAuthority(role);
        return modifyAuthorityRequestDto.getUserId();
    }


    @Override
    @Transactional
    public Long removeMember(Long userId, Long teamId) {
        Team team = teamRepository.findById(teamId).orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));
        TeamUser modifier = teamUserRepository.findByUserIdAndTeamId(SecurityUtil.getCurrentUserId(), team.getId())
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_USER_NOT_FOUND));
        TeamUser user = teamUserRepository.findByUserIdAndTeamId(userId, team.getId())
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_USER_NOT_FOUND));
        if(modifier.getRole().getPriority()<=user.getRole().getPriority()){
            throw new CustomException(ErrorCode.NO_AUTH_TO_DELETE);
        }
        teamUserRepository.delete(user);
        return userId;
    }

    @Override
    @Transactional
    public Long leaveTeam(Long teamId) {
        TeamUser teamUser = teamUserRepository.findByUserIdAndTeamId(SecurityUtil.getCurrentUserId(), teamId)
                .orElseThrow(() -> new CustomException(ErrorCode.TEAM_USER_NOT_FOUND));
        teamUserRepository.delete(teamUser);
        return SecurityUtil.getCurrentUserId();
    }

    public boolean checkAuthorityToManage(){

        return true;
    }
}
