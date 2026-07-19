package com.matheusjung.auth.dto.response;

public record TokenResponse (
    String accessToken,
    String nome,
    String nomeUsuario,
    String fotoUrl
) {}
