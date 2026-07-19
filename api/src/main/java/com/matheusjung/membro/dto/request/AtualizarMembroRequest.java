package com.matheusjung.membro.dto.request;

import java.util.UUID;

public record AtualizarMembroRequest(
    UUID id,
    String nome,
    String fotoUrl,
    UUID usuarioId
) {}