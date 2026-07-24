package com.matheusjung.auth.dto.response;

import java.util.UUID;

public record TokenResponse (
    String accessToken,
    UUID usuarioId
) {}
