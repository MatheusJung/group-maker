package com.matheusjung.auth.exception;

public class AuthException extends RuntimeException {

    public AuthException(String message) {
        super(message);
    }

    public static AuthException naoAutenticado() {
        return new AuthException("Usuário não está autenticado no sistema.");
    }

    public static AuthException usuarioNaoEncontrado() {
        return new AuthException("Usuário logado não encontrado no banco de dados.");
    }

    public static AuthException acessoNegado() {
    return new AuthException("Operação não permitida. Você não é administrador deste grupo.");
    }
}
