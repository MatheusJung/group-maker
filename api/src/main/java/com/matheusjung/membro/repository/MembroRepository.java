package com.matheusjung.membro.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.matheusjung.membro.model.Membro;

public interface MembroRepository
        extends JpaRepository<Membro, UUID> {

    Optional<Membro> findByNome(String nome);
    Optional<Membro> findByUsuarioId(UUID usuarioId);
}
