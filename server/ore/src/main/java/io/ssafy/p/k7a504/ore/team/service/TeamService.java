package io.ssafy.p.k7a504.ore.team.service;

import io.ssafy.p.k7a504.ore.team.dto.TeamEditRequestDto;
import io.ssafy.p.k7a504.ore.team.dto.TeamRequestDto;
import io.ssafy.p.k7a504.ore.team.dto.TeamResponseDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface TeamService {
    Long saveTeam(TeamRequestDto teamReqDTO, MultipartFile file);
    TeamResponseDto getTeam(Long teamId);
    TeamResponseDto editTeam(TeamEditRequestDto teamEditReqDTO, MultipartFile file);
    Long removeTeam(Long teamId);
}
