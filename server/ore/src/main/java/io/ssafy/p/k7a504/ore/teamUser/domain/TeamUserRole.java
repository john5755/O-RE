package io.ssafy.p.k7a504.ore.teamUser.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TeamUserRole {
    LEADER(3),
    MANAGER(2),
    MEMBER(1);

    private final int priority;
}
