package io.ssafy.p.k7a504.ore.user.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum UserRole {
    OWNER(3),
    ADMIN(2),
    USER(1);

    private final int priority;
}
