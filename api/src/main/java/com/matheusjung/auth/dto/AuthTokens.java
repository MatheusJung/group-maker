package com.matheusjung.auth.dto;

import java.util.UUID;

public record AuthTokens(
    String accessToken,
    UUID refreshToken,
    String nome,
    String nomeUsuario,
    String fotoUrl
) {}
