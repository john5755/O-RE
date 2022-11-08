package io.ssafy.p.k7a504.ore.pageUser.service;

import io.ssafy.p.k7a504.ore.pageUser.dto.*;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface PageUserService {

    Long leavePageUser(Long pageId);
    Long deletePageUser(PageUserDeleteRequestDto pageUserDeleteDto );
    Long invitePageUser(PageUserInviteRequestDto pageUserInviteDto);
    PageUserResponseDto getPageUser(Long pageUserId);
    Slice<PageUserResponseDto> getPageUserList(Long pageId, Pageable pageable);
    Long changeAuth(PageUserModifyAuthRequestDto pageUserModifyAuthRequestDto);
    Slice<PageOfTeamResponseDto> pageOfTeam(Long teamId, Pageable pageable);
}
