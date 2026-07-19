package com.matheusjung.grupo;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GrupoRepository
        extends JpaRepository<Grupo, UUID> {

    Optional<Grupo> findByNome(String nome);

    List<Grupo> findByGrupoPaiId(UUID grupoPaiId);
}
