package io.ssafy.p.k7a504.ore.common.security;

import io.ssafy.p.k7a504.ore.common.exception.CustomException;
import io.ssafy.p.k7a504.ore.common.exception.ErrorCode;
import io.ssafy.p.k7a504.ore.user.domain.UserRole;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

@Slf4j
public class SecurityUtil {

    public static String getCurrentEmail() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null || authentication.getPrincipal() == null)
            throw new CustomException(ErrorCode.NOT_FOUND_CREDENTIALS);

        CustomDetails customDetails = (CustomDetails) authentication.getPrincipal();
        return customDetails.getEmail();
    }

    public static Long getCurrentUserId() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null || authentication.getPrincipal() == null)
            throw new CustomException(ErrorCode.NOT_FOUND_CREDENTIALS);

        CustomDetails customDetails = (CustomDetails) authentication.getPrincipal();
        return Long.parseLong(customDetails.getUsername());
    }

    public static UserRole getCurrentRole() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null || authentication.getPrincipal() == null)
            throw new CustomException(ErrorCode.NOT_FOUND_CREDENTIALS);

        CustomDetails customDetails = (CustomDetails) authentication.getPrincipal();
        return customDetails.getRole();
    }
}
