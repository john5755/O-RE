package io.ssafy.p.k7a504.ore.user.service.impl;

import io.ssafy.p.k7a504.ore.common.exception.CustomException;
import io.ssafy.p.k7a504.ore.common.exception.ErrorCode;
import io.ssafy.p.k7a504.ore.user.dto.EmailResponseDto;
import io.ssafy.p.k7a504.ore.user.dto.UserSignUpRequestDto;
import io.ssafy.p.k7a504.ore.user.repository.UserRepository;
import io.ssafy.p.k7a504.ore.user.service.EmailService;
import io.ssafy.p.k7a504.ore.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    @Override
    public EmailResponseDto verifyEmail(String email) {
        if(userRepository.existsByEmail(email))
            throw new CustomException(ErrorCode.DUPLICATE_USER_EMAIL);

        return EmailResponseDto.builder()
                .email(email)
                .code(emailService.sendCertificationMail(email)).build();
    }

    @Transactional
    @Override
    public String signUp(UserSignUpRequestDto userSignUpRequestDto) {
        if(userRepository.existsByEmail(userSignUpRequestDto.getEmail()))
            throw new CustomException(ErrorCode.DUPLICATE_USER_EMAIL);

        return userRepository.save(userSignUpRequestDto.toEntityWithOwner(encoder)).getEmail();
    }
}
