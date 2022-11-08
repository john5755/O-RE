package io.ssafy.p.k7a504.ore.user.service;

import io.ssafy.p.k7a504.ore.jwt.TokenDto;
import io.ssafy.p.k7a504.ore.user.dto.*;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    long validateDomainUser();
    void sendCertificationEmail(String email);
    boolean verifyEmail(UserEmailVerificationRequestDto emailVerificationRequestDto);
    String signUp(UserSignUpRequestDto userSignUpRequestDto);
    TokenDto signIn(UserSignInRequestDto userSignInRequestDto);
    TokenDto reissue(TokenRequestDto tokenRequestDto);
    void findUserPassword(UserInfoRequestDto userInfoRequestDto);
    int addUserList(MultipartFile file);
    Slice<UserSearchResponseDto> searchUserByName(String keyword, Pageable pageable);
    Slice<UserSearchResponseDto> searchUserByNickname(String keyword, Pageable pageable);
    Slice<UserSearchResponseDto> searchAllUser(Pageable pageable);
    UserInfoResponseDto findUserInfo();
    Long modifyUserInfo(MultipartFile profileImage, UserModifyReqeustDto profileInfo);
    Long modifyUserPassword(UserPasswordRequestDto userPasswordRequestDto);
}
