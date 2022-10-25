package io.ssafy.p.k7a504.ore.pageUser.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;


@Getter
@RequiredArgsConstructor
public enum PageUserRole {
    MAINTAINER(3),
    EDITOR(2),
    VIEWER(1);

    private final int priority;
}
