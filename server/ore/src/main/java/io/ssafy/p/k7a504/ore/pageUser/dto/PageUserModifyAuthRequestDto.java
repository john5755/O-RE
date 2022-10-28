package io.ssafy.p.k7a504.ore.pageUser.dto;

import io.ssafy.p.k7a504.ore.pageUser.domain.PageUserRole;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class PageUserModifyAuthRequestDto {
    @NotNull
    private Long pageUserId;
    @NotNull
    private PageUserRole pageUserRole;

}
