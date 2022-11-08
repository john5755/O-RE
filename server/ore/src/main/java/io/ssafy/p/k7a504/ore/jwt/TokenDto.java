package io.ssafy.p.k7a504.ore.jwt;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TokenDto {

    private String grantType;
    private String accessToken;
    private String refreshToken;
    private Long accessTokenExpiration;
    private Long refreshTokenExpiration;

    @Builder
    public TokenDto(String grantType, String accessToken, String refreshToken, Long accessTokenExpiration, Long refreshTokenExpiration) {
        this.grantType = grantType;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.accessTokenExpiration = accessTokenExpiration;
        this.refreshTokenExpiration = refreshTokenExpiration;
    }
}
