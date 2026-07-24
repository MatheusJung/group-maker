package com.matheusjung.auth.service;

import javax.crypto.SecretKey;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class JwtService {

    @Value("${auth.jwt-secret}")
    private String secretKey;

    @Value("${auth.jwt-expiration-minutes:15}")
    private long jwtExpirationMinutes;

    private SecretKey getSignKey() { 
        byte[] keyBytes = this.secretKey.getBytes(java.nio.charset.StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String gerar(String nomeUsuario, UUID usuarioId ) {
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("usuarioId", usuarioId.toString());

        Instant agora = Instant.now();
        Instant expiraEm = agora.plus(jwtExpirationMinutes, ChronoUnit.MINUTES);

        return Jwts.builder()
            .claims(extraClaims)
            .subject(nomeUsuario)
            .issuedAt(Date.from(agora))
            .expiration(Date.from(expiraEm))
            .signWith(getSignKey())
            .compact();
    }

    public UUID extrairUsuarioId(String token) {
        String id = extrairTodasClaims(token).get("usuarioId", String.class);
        return UUID.fromString(id);
    }

    public String extrairNomeUsuario(String token) {
        return extrairTodasClaims(token).getSubject();
    }

    public Instant extrairExpiracao(String token) {
        return extrairTodasClaims(token)
                .getExpiration()
                .toInstant();
    }

    private Claims extrairTodasClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSignKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}