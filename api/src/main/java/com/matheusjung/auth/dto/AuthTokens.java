package com.matheusjung.auth.dto;

import java.util.UUID;

public record AuthTokens(
    String accessToken,
    UUID refreshToken,
    UUID usuarioId
) {}
