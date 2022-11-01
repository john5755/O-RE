package io.ssafy.p.k7a504.ore.user.service;

import io.ssafy.p.k7a504.ore.jwt.TokenDto;
import io.ssafy.p.k7a504.ore.user.dto.*;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    void sendCertificationEmail(String email);
    boolean verifyEmail(UserEmailVerificationRequestDto emailVerificationRequestDto);
    String signUp(UserSignUpRequestDto userSignUpRequestDto);
    TokenDto signIn(UserSignInRequestDto userSignInRequestDto);
    void findUserPassword(UserInfoRequestDto userInfoRequestDto);
    int addUserList(MultipartFile file);
    Slice<UserSearchResponseDto> searchUserByName(String keyword, Pageable pageable);
    Slice<UserSearchResponseDto> searchUserByNickname(String keyword, Pageable pageable);
    Slice<UserSearchResponseDto> searchAllUser(Pageable pageable);
    UserInfoResponseDto findUserInfo();
    void initializeProfileImage();
    Long modifyUserInfo(MultipartFile profileImage, UserModifyReqeustDto profileInfo);
}
