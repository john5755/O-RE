package io.ssafy.p.k7a504.ore.teamUser.api;

import io.ssafy.p.k7a504.ore.common.exception.CustomException;
import io.ssafy.p.k7a504.ore.common.exception.ErrorCode;
import io.ssafy.p.k7a504.ore.common.response.BasicResponse;
import io.ssafy.p.k7a504.ore.common.response.CommonResponse;
import io.ssafy.p.k7a504.ore.teamUser.domain.TeamUser;
import io.ssafy.p.k7a504.ore.teamUser.domain.TeamUserRole;
import io.ssafy.p.k7a504.ore.teamUser.dto.*;
import io.ssafy.p.k7a504.ore.teamUser.service.impl.TeamUserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/team-user")
public class TeamUserApiController {

    private final TeamUserServiceImpl teamUserService;

    @GetMapping("/teams/list")
    public ResponseEntity<? extends BasicResponse> findTeamsUserBelongTo(Pageable pageable){
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse<>(teamUserService.findTeamsUserBelongTo(pageable)));
    }

    @GetMapping("/users/list")
    public ResponseEntity<? extends BasicResponse> findUsersInTeam(@RequestParam Long teamId, Pageable pageable){
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse<>(teamUserService.findUsersInTeam(teamId, pageable)));
    }

    @PostMapping("")
    public ResponseEntity<? extends BasicResponse> inviteMember(@Valid @RequestBody TeamMemberAddRequestDto teamMemberAddRequestDto){
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse<>(teamUserService.inviteMember(teamMemberAddRequestDto)));
    }

    @PatchMapping("/{teamId}}")
    public  ResponseEntity<String> changeAuthorities(@RequestParam Long teamId, @RequestBody  List<ModifyAuthorityRequestDto> list){
        List<ModifyAuthoritiesParamDto> modifyAuthoritiesParamList = new ArrayList<>();
        for(ModifyAuthorityRequestDto modifyAuthorityRequestDto: list){
            TeamUserRole teamUserRole = TeamUserRole.matchTeamUserRole(modifyAuthorityRequestDto.getRole());
            ModifyAuthoritiesParamDto modifyAuthoritiesParamDto = ModifyAuthoritiesParamDto.createModifyAuthorityParam(modifyAuthorityRequestDto, teamUserRole, teamId);
            modifyAuthoritiesParamList.add(modifyAuthoritiesParamDto);
        }
        teamUserService.changeAuthorites(modifyAuthoritiesParamList, teamId);
        return ResponseEntity.status(HttpStatus.OK).body("수정완료");
    }

    @DeleteMapping("/removal")
    public ResponseEntity<CommonResponse<Long>> removeMember(@Valid @RequestBody DeleteMemberRequestDto deleteMemberRequestDto){
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse<>(teamUserService.removeMember(deleteMemberRequestDto.getUserId(), deleteMemberRequestDto.getTeamId())));
    }

    @DeleteMapping("/{teamId}")
    public ResponseEntity<CommonResponse<Long>> leaveTeam(@PathVariable Long teamId){
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse<>(teamUserService.leaveTeam(teamId)));
    }

}
