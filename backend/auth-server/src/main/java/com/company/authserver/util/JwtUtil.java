package com.company.authserver.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Calendar;

@Component
@Slf4j
public class JwtUtil {

    private final SecretKey jwtAccessSecret;
    private final SecretKey jwtRefreshSecret;

    private final Integer jwtAccessExpirationMinutes;
    private final Integer jwtRefreshExpirationDays;

    public JwtUtil(
            @Value("${jwt.access.secret}") String jwtAccessSecret,
            @Value("${jwt.refresh.secret}") String jwtRefreshSecret,
            @Value("${jwt.access.expiration.minutes}") Integer jwtAccessExpirationMinutes,
            @Value("${jwt.refresh.expiration.days}") Integer jwtRefreshExpirationDays
    ) {
        this.jwtAccessSecret = Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtAccessSecret));
        this.jwtRefreshSecret = Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtRefreshSecret));
        this.jwtAccessExpirationMinutes = jwtAccessExpirationMinutes;
        this.jwtRefreshExpirationDays = jwtRefreshExpirationDays;
    }

    public String generateAccessToken(String userId) {
        Calendar expirationTime = Calendar.getInstance();
        expirationTime.add(Calendar.MINUTE, jwtAccessExpirationMinutes);

        return Jwts.builder()
                .setSubject(userId)
                .setExpiration(expirationTime.getTime())
                .signWith(jwtAccessSecret)
                .compact();
    }

    public String generateRefreshToken(String userId) {
        Calendar expirationTime = Calendar.getInstance();
        expirationTime.add(Calendar.DAY_OF_MONTH, jwtRefreshExpirationDays);

        return Jwts.builder()
                .setSubject(userId)
                .setExpiration(expirationTime.getTime())
                .signWith(jwtRefreshSecret)
                .compact();
    }

    public boolean validateAccessToken(String accessToken) {
        return validateToken(accessToken, jwtAccessSecret);
    }

    public boolean validateRefreshToken(String refreshToken) {
        return validateToken(refreshToken, jwtRefreshSecret);
    }

    private boolean validateToken(String token, SecretKey secret) {
        try {
            Jwts.parserBuilder().setSigningKey(secret).build().parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException expiredEx) {
            log.error("Token expired", expiredEx);
        } catch (UnsupportedJwtException unsupportedEx) {
            log.error("Unsupported jwt", unsupportedEx);
        } catch (MalformedJwtException malformedEx) {
            log.error("Malformed jwt", malformedEx);
        } catch (Exception ex) {
            log.error("Invalid token", ex);
        }
        return false;
    }

    public Claims getAccessTokenClaims(String token) {
        return getClaims(token, jwtAccessSecret);
    }

    public Claims getRefreshTokenClaims(String token) {
        return getClaims(token, jwtRefreshSecret);
    }

    private Claims getClaims(String token, SecretKey secret) {
        return Jwts.parserBuilder()
                .setSigningKey(secret)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

}

