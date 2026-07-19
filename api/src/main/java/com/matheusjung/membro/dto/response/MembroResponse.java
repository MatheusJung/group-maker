package com.matheusjung.membro.dto.response;

import java.util.UUID;

public record MembroResponse(
    UUID id,
    String nome,
    String fotoUrl,
    UUID usuarioId
) {}
