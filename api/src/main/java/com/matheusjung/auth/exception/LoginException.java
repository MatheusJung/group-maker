package com.matheusjung.auth.exception;

public class LoginException extends RuntimeException {

    public LoginException(String message) {
        super(message);
    }

    public static LoginException invalida() {
        return new LoginException("Usuário ou senha inválidos");
    }
}