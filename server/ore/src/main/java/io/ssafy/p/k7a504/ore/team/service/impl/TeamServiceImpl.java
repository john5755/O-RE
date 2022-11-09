package io.ssafy.p.k7a504.ore.team.service.impl;

import io.ssafy.p.k7a504.ore.common.exception.CustomException;
import io.ssafy.p.k7a504.ore.common.exception.ErrorCode;
import io.ssafy.p.k7a504.ore.team.domain.Team;
import io.ssafy.p.k7a504.ore.team.dto.TeamCreateRequestDto;
import io.ssafy.p.k7a504.ore.team.dto.TeamEditRequestDto;
import io.ssafy.p.k7a504.ore.team.dto.TeamResponseDto;
import io.ssafy.p.k7a504.ore.team.repository.TeamRepository;
import io.ssafy.p.k7a504.ore.team.service.TeamService;
import io.ssafy.p.k7a504.ore.upload.S3Uploader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TeamServiceImpl implements TeamService {
    private final TeamRepository teamRepository;
    private final S3Uploader s3Uploader;

    @Override
    @Transactional
    public Long createTeam(TeamCreateRequestDto teamCreateRequestDto, MultipartFile multipartFile) {
        String url =  Team.getDefaultImageUrl();
        if(multipartFile!=null){
            try{
                url = s3Uploader.uploadFiles(multipartFile, "team");
            }catch(Exception e){
                throw new RuntimeException(e);
            }
        }
        Team team = Team.createTeam(teamCreateRequestDto.getName(), url);
        return teamRepository.save(team).getId();
    }
    @Override
    public TeamResponseDto findTeamInfo(final Long teamId){
        return new TeamResponseDto(teamRepository.findById(teamId).orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND)));
    }
    @Override
    @Transactional
    public TeamResponseDto modifyTeam(TeamEditRequestDto teamEditReqDTO, MultipartFile multipartFile){
        Team team = teamRepository.findById(teamEditReqDTO.getTeamId()).orElseThrow(() -> new CustomException(ErrorCode.TEAM_NOT_FOUND));
        String teamImg = teamEditReqDTO.getImageUrl();
        if(teamImg.length()==0){
            teamImg=Team.getDefaultImageUrl();
        }
        if(multipartFile!=null){
            try{
                teamImg=team.modifyTeamImage(multipartFile, s3Uploader);
            }catch(Exception e){
                throw new RuntimeException(e);
            }
        }
        team.modifyTeamInfo(teamEditReqDTO.getName(), teamImg);
        return new TeamResponseDto(teamEditReqDTO.getTeamId(), teamEditReqDTO.getName(), teamImg);
    }
    @Override
    @Transactional
    public Long removeTeam(final Long teamId){
        Team team = teamRepository.findById(teamId).orElseThrow(()->new CustomException(ErrorCode.TEAM_NOT_FOUND));
        teamRepository.deleteById(teamId);
        return teamId;
    }
}
