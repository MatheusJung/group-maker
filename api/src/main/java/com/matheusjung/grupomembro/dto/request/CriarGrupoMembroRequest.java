package com.matheusjung.grupomembro.dto.request;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;

public record CriarGrupoMembroRequest(
        @NotNull
        UUID grupoId,

        @NotNull
        UUID membroId

) {}