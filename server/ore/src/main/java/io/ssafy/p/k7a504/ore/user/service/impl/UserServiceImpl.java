package io.ssafy.p.k7a504.ore.user.service.impl;

import io.ssafy.p.k7a504.ore.common.excel.ExcelUtil;
import io.ssafy.p.k7a504.ore.common.exception.CustomException;
import io.ssafy.p.k7a504.ore.common.exception.ErrorCode;
import io.ssafy.p.k7a504.ore.common.redis.RedisUtil;
import io.ssafy.p.k7a504.ore.common.security.SecurityUtil;
import io.ssafy.p.k7a504.ore.jwt.TokenDto;
import io.ssafy.p.k7a504.ore.jwt.TokenProvider;
import io.ssafy.p.k7a504.ore.upload.S3Uploader;
import io.ssafy.p.k7a504.ore.user.domain.User;
import io.ssafy.p.k7a504.ore.user.domain.UserRole;
import io.ssafy.p.k7a504.ore.user.dto.*;
import io.ssafy.p.k7a504.ore.user.repository.UserRepository;
import io.ssafy.p.k7a504.ore.user.service.EmailService;
import io.ssafy.p.k7a504.ore.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FilenameUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final EmailService emailService;
    private final BCryptPasswordEncoder encoder;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final ExcelUtil excelUtil;
    private final S3Uploader s3Uploader;
    private final RedisUtil redisUtil;

    @Override
    public long validateDomainUser() {
        return userRepository.count();
    }

    @Override
    public void sendCertificationEmail(String email) {
        if(userRepository.existsByEmail(email))
            throw new CustomException(ErrorCode.DUPLICATE_USER_EMAIL);
        emailService.sendCertificationMail(email);
    }

    @Override
    public boolean verifyEmail(UserEmailVerificationRequestDto emailVerificationRequestDto) {
        return emailService.verifyEmail(emailVerificationRequestDto);
    }

    @Transactional
    @Override
    public String signUp(UserSignUpRequestDto userSignUpRequestDto) {
        if(userRepository.count() != 0)
            throw new CustomException(ErrorCode.NO_AUTH_TO_SIGN_UP_FOR_OWNER);
        if(userRepository.existsByEmail(userSignUpRequestDto.getEmail()))
            throw new CustomException(ErrorCode.DUPLICATE_USER_EMAIL);

        String verification = redisUtil.getData("[Success]"+userSignUpRequestDto.getEmail());
        if(verification == null)
            throw new CustomException(ErrorCode.NOT_VALID_EMAIL);
        redisUtil.deleteData("[Success]"+userSignUpRequestDto.getEmail());

        return userRepository.save(userSignUpRequestDto.toEntityWithOwner(encoder)).getEmail();
    }

    @Override
    @Transactional
    public TokenDto signIn(UserSignInRequestDto userSignInRequestDto) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userSignInRequestDto.getEmail(), userSignInRequestDto.getPassword());
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);
        redisUtil.setDataExpire("[RefreshToken]"+authentication.getName(), tokenDto.getRefreshToken(), tokenDto.getRefreshTokenExpiration().getTime()/1000);

        return tokenDto;
    }

    @Override
    @Transactional
    public TokenDto reissue(TokenRequestDto tokenRequestDto) {
        if(!tokenProvider.validateToken(tokenRequestDto.getRefreshToken()))
            throw new CustomException(ErrorCode.NOT_VALID_REFRESH_TOKEN);

        String accessToken = tokenRequestDto.getAccessToken();
        Authentication authentication = tokenProvider.getAuthentication(accessToken);

        User user = userRepository.findById(Long.parseLong(authentication.getName()))
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        String refreshToken = redisUtil.getData("[RefreshToken]"+user.getId());

        if(refreshToken == null)
            throw new CustomException(ErrorCode.NOT_FOUND_REFRESH_TOKEN);

        if(!refreshToken.equals(tokenRequestDto.getRefreshToken()))
            throw new CustomException(ErrorCode.NOT_VALID_REFRESH_TOKEN);

        TokenDto newTokenDto = tokenProvider.generateTokenDto(authentication);
        redisUtil.setDataExpire("[RefreshToken]"+user.getEmail(), newTokenDto.getRefreshToken(), newTokenDto.getRefreshTokenExpiration().getTime()/1000);
        return newTokenDto;
    }

    @Override
    @Transactional
    public void findUserPassword(UserInfoRequestDto userInfoRequestDto) {
        User user = userRepository.findByEmailAndName(userInfoRequestDto.getEmail(), userInfoRequestDto.getName())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        String tempPassword = generateTempPassword();

        user.changePassword(encoder.encode(tempPassword));
        emailService.sendTempPasswordMail(user.getEmail(), tempPassword);
    }

    @Override
    @Transactional
    public int addUserList(MultipartFile file) {
        if(file.isEmpty())
            throw new CustomException(ErrorCode.FILE_NOT_FOUND);

        String extension = FilenameUtils.getExtension(file.getOriginalFilename());
        if(!extension.equals("xls") && !extension.equals("xlsx"))
            throw new CustomException(ErrorCode.NOT_EXCEL_FILE);

        List<User> userList = excelUtil.getListData(file, 1, 2, encoder)
                .stream().map(User::mapToUser)
                .filter(user -> userRepository.existsByEmail(user.getEmail()) == false)
                .collect(Collectors.toList());

        return userRepository.saveAll(userList).size();
    }

    @Override
    public Slice<UserSearchResponseDto> searchUserByName(String keyword, Pageable pageable) {
        if(keyword == null || keyword.equals(""))
            throw new CustomException(ErrorCode.NO_EMPTY_KEYWORD);

        return userRepository.findByNameContains(keyword, pageable)
                .map(UserSearchResponseDto::toResponseDto);
    }

    @Override
    public Slice<UserSearchResponseDto> searchUserByNickname(String keyword, Pageable pageable) {
        if(keyword == null || keyword.equals(""))
            throw new CustomException(ErrorCode.NO_EMPTY_KEYWORD);
        return userRepository.findByNicknameContains(keyword, pageable)
                .map(UserSearchResponseDto::toResponseDto);
    }

    @Override
    public Slice<UserSearchResponseDto> searchAllUser(Pageable pageable) {
        return userRepository.findAll(pageable)
                .map(UserSearchResponseDto::toResponseDto);
    }

    @Override
    public UserInfoResponseDto findUserInfo() {
        User user = userRepository.findById(SecurityUtil.getCurrentUserId())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        return UserInfoResponseDto.toResponseDto(user);
    }

    @Override
    @Transactional
    public Long modifyUserInfo(MultipartFile profileImage, UserModifyReqeustDto profileInfo) {
        User user = userRepository.findById(SecurityUtil.getCurrentUserId())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        if(!profileInfo.getImageUrl().equals(user.getProfileImage())) {
            if(profileInfo.getImageUrl().equals(User.getDefaultImageUrl()))
                user.initializeProfileImage();
            else {
                try {
                    user.modifyProfileImage(profileImage, s3Uploader);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        }

        if(profileInfo.getNickname() != null && !profileInfo.getNickname().equals(""))
            user.modifyProfileNickname(profileInfo.getNickname());

        return user.getId();
    }

    @Override
    @Transactional
    public Long modifyUserPassword(UserPasswordRequestDto userPasswordRequestDto) {
        User user = userRepository.findById(SecurityUtil.getCurrentUserId())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        if(!encoder.encode(userPasswordRequestDto.getOldPassword()).equals(user.getPassword()))
            throw new CustomException(ErrorCode.NOT_VALID_PASSWORD);

        if(userPasswordRequestDto.getOldPassword().equals(userPasswordRequestDto.getNewPassword()))
            throw new CustomException(ErrorCode.DUPLICATE_PASSWORD);

        user.changePassword(encoder.encode(userPasswordRequestDto.getNewPassword()));
        return user.getId();
    }

    @Override
    @Transactional
    public Long leaveServer() {
        User user = userRepository.findById(SecurityUtil.getCurrentUserId())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        userRepository.delete(user);
        return user.getId();
    }

    @Override
    @Transactional
    public int removeUser(List<Long> userIds) {
        User user = userRepository.findById(SecurityUtil.getCurrentUserId())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        List<User> others = userRepository.findByIdIn(userIds);

        if(others.size() != userIds.size())
            throw new CustomException(ErrorCode.USER_NOT_FOUND);

        for(User other : others)
            if(user.getRole().getPriority() <= other.getRole().getPriority())
                throw new CustomException(ErrorCode.NO_AUTH_TO_DELETE);

        userRepository.deleteAllInBatch(others);
        return others.size();
    }

    private String generateTempPassword() {
        char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

        String tempPassword = "";

        int idx = 0;
        for (int i = 0; i < 10; i++) {
            idx = (int) (charSet.length * Math.random());
            tempPassword += charSet[idx];
        }
        return tempPassword;
    }
}
