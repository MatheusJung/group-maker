package com.matheusjung.auth.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.matheusjung.auth.RefreshTokenRepository;
import com.matheusjung.auth.exception.RefreshTokenException;
import com.matheusjung.auth.model.RefreshToken;
import com.matheusjung.membro.model.Usuario;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    @Value("${auth.jwt-refresh-expiration-days:7}")
    private long refreshExpirationDays;

    private final RefreshTokenRepository repository;

    @Transactional
    public RefreshToken gerar(Usuario usuario) {

        repository.revogarTokensPorUsuario(usuario.getId());

        RefreshToken refreshToken = new RefreshToken();

        refreshToken.setUsuario(usuario);
        refreshToken.setToken(UUID.randomUUID());
        refreshToken.setExpiraEm(
                Instant.now().plus(refreshExpirationDays, ChronoUnit.DAYS)
        );
        refreshToken.setRevogado(false);

        return repository.save(refreshToken);
    }

    @Transactional
    public RefreshToken atualizar(UUID token) {

        RefreshToken refresh = this.buscar(token);

        if (Boolean.TRUE.equals(refresh.getRevogado())) {
            throw RefreshTokenException.revoked();
        }

        if (refresh.getExpiraEm().isBefore(Instant.now())) {
            throw RefreshTokenException.expired();
        }

        repository.revogarTokensPorUsuario(refresh.getUsuario().getId());

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUsuario(refresh.getUsuario()); 
        refreshToken.setToken(UUID.randomUUID());
        refreshToken.setExpiraEm(
                Instant.now().plus(refreshExpirationDays, ChronoUnit.DAYS)
        );
        refreshToken.setRevogado(false);

        return repository.save(refreshToken);
    }

    @Transactional
    public void revogar(UUID token) {
        repository.findByTokenAndRevogadoFalse(token).ifPresent(refreshToken -> {
            refreshToken.setRevogado(true);
            repository.save(refreshToken);
        });
    }

    public RefreshToken buscar(UUID tokenUuidVindoDoCookie) {
        
        RefreshToken refreshToken = repository.findById(tokenUuidVindoDoCookie)
                .orElseThrow(RefreshTokenException::notFound);

        if (Boolean.TRUE.equals(refreshToken.getRevogado())) {
            throw RefreshTokenException.notFound();
        }

        return refreshToken;
    }
}
