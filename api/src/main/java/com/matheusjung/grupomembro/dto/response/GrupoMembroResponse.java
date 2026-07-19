package com.matheusjung.grupomembro.dto.response;

import java.util.UUID;

public record GrupoMembroResponse(
        UUID grupoId,
        UUID membroId
) {}
