package com.matheusjung.auth.dto.request;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest (
    @NotBlank
    String nome,

    @NotBlank
    String senha
) {}
