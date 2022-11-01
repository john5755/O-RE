package io.ssafy.p.k7a504.ore.team.service;

import io.ssafy.p.k7a504.ore.team.dto.TeamCreateRequestDto;
import io.ssafy.p.k7a504.ore.team.dto.TeamEditRequestDto;
import io.ssafy.p.k7a504.ore.team.dto.TeamResponseDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface TeamService {
    Long createTeam(TeamCreateRequestDto teamCreateRequestDto, MultipartFile file) ;
    TeamResponseDto findTeamInfo(Long teamId);
    TeamResponseDto modifyTeam(TeamEditRequestDto teamEditReqDTO, MultipartFile file);
    Long removeTeam(Long teamId);
}
