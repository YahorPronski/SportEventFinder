package com.company.apigateway.filter;

import com.company.apigateway.util.JwtUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
public class JwtAuthFilter extends AbstractGatewayFilterFactory<JwtAuthFilter.Config> {

    private final JwtUtil jwtUtil;

    public JwtAuthFilter(JwtUtil jwtUtil) {
        super(Config.class);
        this.jwtUtil = jwtUtil;
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            String authToken = getAuthToken(exchange.getRequest());

            Claims tokenClaims;
            try {
                tokenClaims = jwtUtil.getAccessTokenClaims(authToken);
            } catch (JwtException e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,  e.getMessage());
            }

            exchange.getRequest()
                    .mutate()
                    .header("X-auth-user-id", tokenClaims.getSubject());

            return chain.filter(exchange);
        };
    }

    private String getAuthToken(ServerHttpRequest request) {
        if (!request.getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing authorization information");
        }

        String authHeader = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        String[] authHeaderParts = authHeader.split(" ");

        if (authHeaderParts.length != 2 || !"Bearer".equals(authHeaderParts[0])) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Incorrect authorization structure");
        }

        return authHeaderParts[1];
    }

    public static class Config {
        // empty class as I don't need any particular configuration
    }
}