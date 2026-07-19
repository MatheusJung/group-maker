package com.matheusjung.auth;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.matheusjung.auth.model.RefreshToken;

public interface RefreshTokenRepository
        extends JpaRepository<RefreshToken, UUID> {

    Optional<RefreshToken> findByTokenAndRevogadoFalse(UUID token);

    @Modifying
    @Transactional 
    @Query("""
        UPDATE RefreshToken r
        SET r.revogado = true
        WHERE r.usuario.id = :usuarioId
          AND r.revogado = false
    """)
    void revogarTokensPorUsuario(UUID usuarioId);
}
