package com.matheusjung.grupo.dto.request;

import jakarta.validation.constraints.NotBlank;
import java.util.UUID;

public record CriarGrupoRequest(

    @NotBlank
    String nome,
    String descricao,
    UUID grupoPaiId

) {}