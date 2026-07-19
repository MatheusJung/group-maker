package com.matheusjung.auth.exception;

public class RefreshTokenException extends RuntimeException {

    public RefreshTokenException(String message) {
        super(message);
    }

    public static RefreshTokenException notFound() {
        return new RefreshTokenException("Refresh token não encontrado.");
    }

    public static RefreshTokenException expired() {
        return new RefreshTokenException("Refresh token expirado.");
    }

    public static RefreshTokenException revoked() {
        return new RefreshTokenException("Refresh token revogado.");
    }

}