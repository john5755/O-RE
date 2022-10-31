package io.ssafy.p.k7a504.ore.team.api;

import io.ssafy.p.k7a504.ore.common.response.CommonResponse;
import io.ssafy.p.k7a504.ore.team.dto.TeamEditRequestDto;
import io.ssafy.p.k7a504.ore.team.dto.TeamRequestDto;
import io.ssafy.p.k7a504.ore.team.dto.TeamResponseDto;
import io.ssafy.p.k7a504.ore.team.service.impl.TeamServiceImpl;
import io.ssafy.p.k7a504.ore.teamUser.service.impl.TeamUserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/team")
public class TeamApiController {

    private final TeamServiceImpl teamService;
    private final TeamUserServiceImpl teamUserService;

    @PostMapping("")
    public ResponseEntity<CommonResponse<Long>> createTeam(@PathVariable Long userId, @Valid @RequestBody TeamRequestDto teamReqDTO){
        Long teamId = teamService.saveTeam(userId, teamReqDTO);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(teamUserService.beFirstMember(teamId)));
    }

    @GetMapping("/{teamId}")
    public ResponseEntity<CommonResponse<TeamResponseDto>> getTeam(@PathVariable Long teamId){
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse<>(teamService.getTeam(teamId)));
    }

    //TODO: 권한부여 필요 preAuthorize("hasRole(ADMIN)")
    @PatchMapping("/{teamId}")
    public ResponseEntity<CommonResponse<TeamResponseDto>> modifyTeam(@PathVariable Long teamId, @RequestBody TeamEditRequestDto TeamEditReqDTO ){
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(teamService.editTeam(teamId, TeamEditReqDTO )));
    }

    //TODO: 권한부여 필요 preAuthorize("hasRole(ADMIN)")
    @DeleteMapping("/{teamId}")
    public ResponseEntity<CommonResponse<Long>> deleteTeam(@PathVariable Long teamId){
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(teamService.removeTeam(teamId)));
    }

}
