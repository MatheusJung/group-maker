package com.matheusjung.membro.exception;

public class MembroException extends RuntimeException {

    public MembroException(String message) {
        super(message);
    }

    public static MembroException naoEncontrado() {
        return new MembroException("Registro não encontrado no banco de dados.");
    }
    
    public static MembroException semVinculo() {
        return new MembroException("Este usuário não possui um cadastro de membro vinculado.");
    }
}