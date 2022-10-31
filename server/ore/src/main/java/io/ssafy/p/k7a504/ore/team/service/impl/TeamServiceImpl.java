package io.ssafy.p.k7a504.ore.team.service.impl;

import io.ssafy.p.k7a504.ore.common.exception.CustomException;
import io.ssafy.p.k7a504.ore.common.exception.ErrorCode;
import io.ssafy.p.k7a504.ore.common.s3.S3Service;
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
import org.springframework.web.multipart.MultipartFile;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TeamServiceImpl implements TeamService {
    private final TeamRepository teamRepository;
    private final S3Service s3Service;
    @Override
    @Transactional
    public Long saveTeam(TeamRequestDto teamReqDTO, MultipartFile file){
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
    public TeamResponseDto editTeam(TeamEditRequestDto teamEditReqDTO, MultipartFile file){
        Team team = teamRepository.findById(teamEditReqDTO.getTeamId()).orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));
        String teamImg = team.getImageUrl();
        if(!file.isEmpty()){
            teamImg=s3Service.upload(file);
            s3Service.delete(team.getImageUrl());
        }
        team.update(teamEditReqDTO.getName(), teamImg);
        return new TeamResponseDto(teamEditReqDTO.getTeamId(), teamEditReqDTO.getName(), teamImg);
    }
    @Override
    @Transactional
    public Long removeTeam(final Long teamId){
        Team team = teamRepository.findById(teamId).orElseThrow(()->new CustomException(ErrorCode.TEAM_NOT_FOUND));
        s3Service.delete(team.getImageUrl());
        teamRepository.deleteById(teamId);
        return teamId;
    }
}
