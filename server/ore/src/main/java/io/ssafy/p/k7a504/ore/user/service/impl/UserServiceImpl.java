package io.ssafy.p.k7a504.ore.user.service.impl;

import io.ssafy.p.k7a504.ore.common.exception.CustomException;
import io.ssafy.p.k7a504.ore.common.exception.ErrorCode;
import io.ssafy.p.k7a504.ore.jwt.TokenDto;
import io.ssafy.p.k7a504.ore.jwt.TokenProvider;
import io.ssafy.p.k7a504.ore.user.dto.UserEmailVerificationRequestDto;
import io.ssafy.p.k7a504.ore.user.dto.UserSignInRequestDto;
import io.ssafy.p.k7a504.ore.user.dto.UserSignUpRequestDto;
import io.ssafy.p.k7a504.ore.user.repository.UserRepository;
import io.ssafy.p.k7a504.ore.user.service.EmailService;
import io.ssafy.p.k7a504.ore.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        if(userRepository.existsByEmail(userSignUpRequestDto.getEmail()))
            throw new CustomException(ErrorCode.DUPLICATE_USER_EMAIL);

        return userRepository.save(userSignUpRequestDto.toEntityWithOwner(encoder)).getEmail();
    }

    @Override
    public TokenDto signIn(UserSignInRequestDto userSignInRequestDto) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userSignInRequestDto.getEmail(), userSignInRequestDto.getPassword());
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        return new TokenDto(tokenProvider.createToken(authentication));
    }
}
