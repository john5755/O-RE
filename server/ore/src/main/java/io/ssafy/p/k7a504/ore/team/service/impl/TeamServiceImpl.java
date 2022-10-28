package io.ssafy.p.k7a504.ore.team.service.impl;

import io.ssafy.p.k7a504.ore.common.exception.CustomException;
import io.ssafy.p.k7a504.ore.common.exception.ErrorCode;
import io.ssafy.p.k7a504.ore.common.s3.S3Service;
import io.ssafy.p.k7a504.ore.common.security.SecurityUtil;
import io.ssafy.p.k7a504.ore.team.domain.Team;
import io.ssafy.p.k7a504.ore.team.dto.TeamEditRequestDto;
import io.ssafy.p.k7a504.ore.team.dto.TeamRequestDto;
import io.ssafy.p.k7a504.ore.team.dto.TeamResponseDto;
import io.ssafy.p.k7a504.ore.team.repository.TeamRepository;
import io.ssafy.p.k7a504.ore.team.service.TeamService;
import io.ssafy.p.k7a504.ore.teamUser.domain.TeamUser;
import io.ssafy.p.k7a504.ore.teamUser.repository.TeamUserRepository;
import io.ssafy.p.k7a504.ore.teamUser.service.impl.TeamUserServiceImpl;
import io.ssafy.p.k7a504.ore.user.domain.User;
import io.ssafy.p.k7a504.ore.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TeamServiceImpl implements TeamService {
    private final TeamRepository teamRepository;
    private final UserRepository userRepository;
    private final TeamUserRepository teamUserRepository;
    private final S3Service s3Service;

    @Override
    @Transactional
    public Long saveTeam(TeamRequestDto teamRequestDto){
        String teamImg = teamRequestDto.getImageUrl();
        if(teamImg==null)
            teamImg="https://ore-s3.s3.ap-northeast-2.amazonaws.com/TeamDefaultImg.png";
        Team team = Team.builder()
                .name(teamRequestDto.getName())
                .imageUrl(teamImg)
                .build();
        return teamRepository.save(team).getId();
    }
    @Override
    public TeamResponseDto getTeam(Long teamId){
        return new TeamResponseDto(teamRepository.findById(teamId).orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND)));
    }
    @Override
    @Transactional
    public TeamResponseDto editTeam(TeamEditRequestDto teamEditReqDTO, MultipartFile file) {
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
    public Long removeTeam(Long teamId){
        Team team = teamRepository.findById(teamId).orElseThrow(()->new CustomException(ErrorCode.TEAM_NOT_FOUND));
        User user = userRepository.findById(SecurityUtil.getCurrentUserId()).orElseThrow(()-> new CustomException(ErrorCode.USER_NOT_FOUND));
        TeamUser teamUser = teamUserRepository.findByUserIdAndTeamId(team.getId(), user.getId()).orElseThrow(()-> new CustomException(ErrorCode.TEAM_USER_NOT_FOUND));
        teamRepository.deleteById(teamId);
        return teamId;
    }
}
