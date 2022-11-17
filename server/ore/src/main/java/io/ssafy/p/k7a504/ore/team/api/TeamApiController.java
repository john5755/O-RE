package io.ssafy.p.k7a504.ore.team.api;

import io.ssafy.p.k7a504.ore.common.response.CommonResponse;
import io.ssafy.p.k7a504.ore.team.dto.TeamCreateRequestDto;
import io.ssafy.p.k7a504.ore.team.dto.TeamEditRequestDto;
import io.ssafy.p.k7a504.ore.team.dto.TeamResponseDto;
import io.ssafy.p.k7a504.ore.team.service.impl.TeamServiceImpl;
import io.ssafy.p.k7a504.ore.teamUser.service.impl.TeamUserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/team")
public class TeamApiController {

    private final TeamServiceImpl teamService;
    private final TeamUserServiceImpl teamUserService;

    @PostMapping("")
    @PreAuthorize("hasAnyAuthority('OWNER','ADMIN')")
    public ResponseEntity<CommonResponse<Long>> createTeam(@RequestPart(value="info") TeamCreateRequestDto teamCreateRequestDto, @RequestPart(value = "image", required = false) MultipartFile file){
        Long teamId = teamService.createTeam(teamCreateRequestDto, file);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(teamUserService.beFirstMember(teamId)));
    }

    @GetMapping("/{teamId}")
    public ResponseEntity<CommonResponse<TeamResponseDto>> findTeamInfo(@PathVariable Long teamId){
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse<>(teamService.findTeamInfo(teamId)));
    }

    @PostMapping("/edit")
    public ResponseEntity<CommonResponse<TeamResponseDto>> modifyTeam(@RequestPart(value="info") TeamEditRequestDto TeamEditReqDTO, @RequestPart(value = "image", required = false) MultipartFile file ){
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(teamService.modifyTeam(TeamEditReqDTO , file)));
    }

    @DeleteMapping("/{teamId}")
    public ResponseEntity<CommonResponse<Long>> deleteTeam(@PathVariable Long teamId){
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(teamService.removeTeam(teamId)));
    }

}
