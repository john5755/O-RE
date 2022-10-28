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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/team")
public class TeamApiController {

    private final TeamServiceImpl teamService;
    private final TeamUserServiceImpl teamUserService;


    //TODO: 기본 팀 프로필 이미지 처리 - s3에서 기본이미지 가져오기.
    @PostMapping("")
    //@PreAuthorize("hasRole(ADMIN)")
    public ResponseEntity<CommonResponse<Long>> createTeam(@Valid @RequestBody TeamRequestDto teamReqDTO){
        Long teamId = teamService.saveTeam(teamReqDTO);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(teamUserService.beFirstMember(teamId)));
    }

    @GetMapping("/{teamId}")
    public ResponseEntity<CommonResponse<TeamResponseDto>> getTeam(@PathVariable Long teamId){
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse<>(teamService.getTeam(teamId)));
    }

    //TODO: 기본 팀 프로필 이미지 처리 - s3에서 기본이미지 가져오기.
    @PostMapping("/edit")
    //@PreAuthorize("hasRole(ADMIN)")
    public ResponseEntity<CommonResponse<TeamResponseDto>> modifyTeam(@RequestPart(value="info") TeamEditRequestDto TeamEditReqDTO, @RequestPart(value = "image", required = false) MultipartFile file ){
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(teamService.editTeam(TeamEditReqDTO , file)));
    }

    @DeleteMapping("/{teamId}")
    //@PreAuthorize("hasRole(ADMIN)")
    public ResponseEntity<CommonResponse<Long>> deleteTeam(@PathVariable Long teamId){
        return ResponseEntity.status(HttpStatus.OK)
                .body(new CommonResponse<>(teamService.removeTeam(teamId)));
    }

}
