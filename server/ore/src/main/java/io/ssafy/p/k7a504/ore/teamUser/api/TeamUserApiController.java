package io.ssafy.p.k7a504.ore.teamUser.api;

import io.ssafy.p.k7a504.ore.common.response.BasicResponse;
import io.ssafy.p.k7a504.ore.common.response.CommonResponse;
import io.ssafy.p.k7a504.ore.teamUser.dto.DeleteMemberRequestDto;
import io.ssafy.p.k7a504.ore.teamUser.dto.ModifyAuthorityRequestDto;
import io.ssafy.p.k7a504.ore.teamUser.dto.TeamMemberAddRequestDto;
import io.ssafy.p.k7a504.ore.teamUser.service.impl.TeamUserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/team-user")
public class TeamUserApiController {

    private final TeamUserServiceImpl teamUserService;

    @GetMapping("/{userId}")
    public ResponseEntity<? extends BasicResponse> getTeams(@PathVariable Long userId){
        //todo 임시부여 - header 관련 로직필요
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse<>(teamUserService.getTeamList(userId)));
    }

    @GetMapping("/list/user")
    public ResponseEntity<? extends BasicResponse> getUsersInTeam(@RequestParam Long id){
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse<>(teamUserService.getUserList(id)));
    }

    @PostMapping("")
    public ResponseEntity<? extends BasicResponse> addMember(@Valid @RequestBody TeamMemberAddRequestDto teamMemberAddRequestDto){
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse<>(teamUserService.inviteMember(teamMemberAddRequestDto.getUserId(), teamMemberAddRequestDto.getTeamId())));
    }

    @PatchMapping("")
    public  ResponseEntity<? extends BasicResponse> modifyAuthority(@Valid @RequestBody ModifyAuthorityRequestDto modifyAuthorityRequestDto){
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse<>(teamUserService.changeAuthority(modifyAuthorityRequestDto.getUserId(), modifyAuthorityRequestDto.getTeamId(), modifyAuthorityRequestDto.getRole())));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<CommonResponse<Long>> deleteMember(@Valid @RequestBody DeleteMemberRequestDto deleteMemberRequestDto){
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse<>(teamUserService.removeMember(deleteMemberRequestDto.getUserId(), deleteMemberRequestDto.getTeamId())));
    }

    @DeleteMapping("/{teamId}")
    public ResponseEntity<CommonResponse<Long>> leaveTeam(@PathVariable Long teamId){
        //todo 임시부여 - header 관련 로직필요
        Long userId = 3L;
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse<>(teamUserService.leaveTeam(userId, teamId)));
    }




}
