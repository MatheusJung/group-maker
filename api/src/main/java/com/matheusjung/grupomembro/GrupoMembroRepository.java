package com.matheusjung.grupomembro;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GrupoMembroRepository extends JpaRepository<GrupoMembro, GrupoMembroId> {

    List<GrupoMembro> findByGrupoId(UUID grupoId);

    List<GrupoMembro> findByMembroId(UUID membroId);

    Optional<GrupoMembro> findByGrupoIdAndMembroId(
            UUID grupoId,
            UUID membroId
    );
}
