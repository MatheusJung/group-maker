package com.matheusjung.auth.dto.request;

import java.util.UUID;
import jakarta.validation.constraints.NotBlank;

public record LogoutRequest (

    @NotBlank
    UUID refreshToken
) {}

