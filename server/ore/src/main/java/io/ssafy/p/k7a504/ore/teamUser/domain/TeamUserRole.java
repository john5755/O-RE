package io.ssafy.p.k7a504.ore.teamUser.domain;

import io.ssafy.p.k7a504.ore.common.exception.CustomException;
import io.ssafy.p.k7a504.ore.common.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TeamUserRole {
    OWNER(4),
    LEADER(3),
    MANAGER(2),
    MEMBER(1);

    private final int priority;

    public static TeamUserRole matchTeamUserRole(String role){
        TeamUserRole teamUserRole;
        switch(role){
            case "OWNER":
                throw new CustomException(ErrorCode.CANT_BE_OWNER);
            case "LEADER":
                teamUserRole = TeamUserRole.LEADER;
                break;
            case "MANAGER":
                teamUserRole = TeamUserRole.MANAGER;
                break;
            case "MEMBER":
                teamUserRole = TeamUserRole.MEMBER;
                break;
            default:
                throw new CustomException(ErrorCode.AUTHORITY_NOT_FOUND);
        }
        return teamUserRole;
    }
}
