package com.matheusjung.auth.dto.request;

import jakarta.validation.constraints.NotBlank;

public record CadastroRequest(

        @NotBlank
        String nomeUsuario,

        @NotBlank
        String senha,

        @NotBlank
        String nome
) {}
