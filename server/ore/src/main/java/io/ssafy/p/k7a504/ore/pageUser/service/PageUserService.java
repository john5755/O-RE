package io.ssafy.p.k7a504.ore.pageUser.service;

import io.ssafy.p.k7a504.ore.pageUser.dto.*;

import java.util.List;

public interface PageUserService {

    Long leavePageUser(Long pageId);
    Long deletePageUser(PageUserDeleteRequestDto pageUserDeleteDto );
    Long invitePageUser(PageUserInviteRequestDto pageUserInviteDto);
    PageUserResponseDto getPageUser(Long pageUserId);
    List<PageUserResponseDto> getPageUserList(Long pageId);
    Long changeAuth(List<PageUserModifyAuthRequestDto> pageUserModifyAuthRequestDto);
}
