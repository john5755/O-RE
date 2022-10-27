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
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/{userId}")
    public ResponseEntity<? extends BasicResponse> addMember(@PathVariable Long userId, @RequestBody TeamMemberAddRequestDto teamMemberAddRequestDto){
        //todo 임시부여 - header 관련 로직필요
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse<>(teamUserService.inviteMember(userId, teamMemberAddRequestDto.getUserId(), teamMemberAddRequestDto.getTeamId())));
    }

    @PatchMapping("/{userId}")
    public  ResponseEntity<? extends BasicResponse> modifyAuthority(@PathVariable Long userId, @RequestBody ModifyAuthorityRequestDto modifyAuthorityRequestDto){
        //todo 임시부여 - header 관련 로직필요
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse<>(teamUserService.changeAuthority(userId, modifyAuthorityRequestDto.getUserId(), modifyAuthorityRequestDto.getTeamId(), modifyAuthorityRequestDto.getRole())));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<CommonResponse<Long>> deleteMember(@PathVariable Long id, @RequestBody DeleteMemberRequestDto deleteMemberRequestDto){
        //todo 임시부여 - header 관련 로직필요
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse<>(teamUserService.removeMember(id, deleteMemberRequestDto.getUserId(), deleteMemberRequestDto.getTeamId())));
    }

    @DeleteMapping("/{teamId}")
    public ResponseEntity<CommonResponse<Long>> leaveTeam(@PathVariable Long teamId){
        //todo 임시부여 - header 관련 로직필요
        Long userId = 3L;
        return ResponseEntity.status(HttpStatus.OK).body(new CommonResponse<>(teamUserService.leaveTeam(userId, teamId)));
    }




}
