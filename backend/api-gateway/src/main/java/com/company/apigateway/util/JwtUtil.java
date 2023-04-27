package com.company.apigateway.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;

@Component
public class JwtUtil {

    private final SecretKey jwtAccessSecret;

    public JwtUtil(@Value("${jwt.access.secret}") String jwtAccessSecret) {
        this.jwtAccessSecret = Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtAccessSecret));
    }

    public Claims getAccessTokenClaims(String token) throws JwtException {
        return Jwts.parserBuilder()
                .setSigningKey(jwtAccessSecret)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

}

