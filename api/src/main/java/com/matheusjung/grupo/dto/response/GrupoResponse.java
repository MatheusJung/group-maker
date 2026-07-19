package com.matheusjung.grupo.dto.response;

import java.util.UUID;

public record GrupoResponse(
    UUID id,
    String nome,
    String descricao,
    UUID grupoPaiId
){}
