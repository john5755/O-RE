package io.ssafy.p.k7a504.ore.pageUser.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;


@Getter
@RequiredArgsConstructor
public enum PageUserRole {
    OWNER(4),
    MAINTAINER(3),
    EDITOR(2),
    VIEWER(1);

    private final int priority;
}
