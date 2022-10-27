package io.ssafy.p.k7a504.ore.pageUser.service;

import io.ssafy.p.k7a504.ore.pageUser.dto.PageUserDeleteRequestDto;
import io.ssafy.p.k7a504.ore.pageUser.dto.PageUserGetRequestDto;
import io.ssafy.p.k7a504.ore.pageUser.dto.PageUserInviteRequestDto;
import io.ssafy.p.k7a504.ore.pageUser.dto.PageUserResponseDto;

import java.util.List;

public interface PageUserService {

    Long leavePageUser(Long pageId);
    Long deletePageUser(PageUserDeleteRequestDto pageUserDeleteDto );
    PageUserResponseDto invitePageUser(PageUserInviteRequestDto pageUserInviteDto);
    PageUserResponseDto getPageUser(PageUserGetRequestDto pageUserGetDto);
    List<PageUserResponseDto> getPageUserList(Long pageId);
}
