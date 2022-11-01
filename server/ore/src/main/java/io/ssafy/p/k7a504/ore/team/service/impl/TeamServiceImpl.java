package io.ssafy.p.k7a504.ore.team.service.impl;

import io.ssafy.p.k7a504.ore.common.exception.CustomException;
import io.ssafy.p.k7a504.ore.common.exception.ErrorCode;
import io.ssafy.p.k7a504.ore.team.domain.Team;
import io.ssafy.p.k7a504.ore.team.dto.TeamEditRequestDto;
import io.ssafy.p.k7a504.ore.team.dto.TeamRequestDto;
import io.ssafy.p.k7a504.ore.team.dto.TeamResponseDto;
import io.ssafy.p.k7a504.ore.team.repository.TeamRepository;
import io.ssafy.p.k7a504.ore.team.service.TeamService;
import io.ssafy.p.k7a504.ore.teamUser.service.impl.TeamUserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TeamServiceImpl implements TeamService {
    private final TeamRepository teamRepository;
    private final TeamUserServiceImpl teamUserService;
    @Override
    @Transactional
    public Long saveTeam(TeamRequestDto teamReqDTO){
        Team team = Team.builder()
                .name(teamReqDTO.getName())
                .imageUrl(teamReqDTO.getImageUrl())
                .build();
        return teamRepository.save(team).getId();
    }
    @Override
    public TeamResponseDto getTeam(final Long teamId){
        return new TeamResponseDto(teamRepository.findById(teamId).orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND)));
    }
    @Override
    @Transactional
    public TeamResponseDto editTeam(final Long teamId, TeamEditRequestDto teamEditReqDTO){
        Team team = teamRepository.findById(teamId).orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));
        team.update(teamEditReqDTO.getName(), teamEditReqDTO.getImageUrl());
        return new TeamResponseDto(teamId, teamEditReqDTO.getName(), teamEditReqDTO.getImageUrl());
    }
    @Override
    @Transactional
    public Long removeTeam(final Long teamId){
        if(!teamRepository.existsById(teamId)){
            throw new CustomException(ErrorCode.TEAM_NOT_FOUND);
        }
        teamRepository.deleteById(teamId);
        return teamId;
    }
}
