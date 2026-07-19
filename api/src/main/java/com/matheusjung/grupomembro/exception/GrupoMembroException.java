package com.matheusjung.grupomembro.exception;

public class GrupoMembroException extends RuntimeException {

    public GrupoMembroException(String message) {
        super(message);
    }

    public static GrupoMembroException jaPertenceAoGrupo() {
        return new GrupoMembroException("Este membro já faz parte deste grupo.");
    }

    public static GrupoMembroException naoPertenceAoGrupo() {
        return new GrupoMembroException("Membro não pertence a este grupo.");
    }

    public static GrupoMembroException naoPertenceAoGrupoPai() {
        return new GrupoMembroException("Membro não pertence a este grupo.");
    }

    public static GrupoMembroException naoEhAdminException() {
        return new GrupoMembroException("Acesso negado. Apenas administradores do grupo podem realizar esta ação.");
    }
}