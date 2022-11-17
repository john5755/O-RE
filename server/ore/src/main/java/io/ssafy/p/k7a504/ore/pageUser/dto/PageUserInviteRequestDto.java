package io.ssafy.p.k7a504.ore.pageUser.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class PageUserInviteRequestDto {
    @NotNull
    private Long pageId;

    private List<Long> teamUserIdList;
}
