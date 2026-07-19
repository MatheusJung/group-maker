CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE refresh_tokens(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL,
    token UUID NOT NULL DEFAULT gen_random_uuid(),
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expira_em TIMESTAMPTZ NOT NULL,
    revogado BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT fk_token_usuario
        FOREIGN KEY(usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_refresh_tokens_usuario_id
ON refresh_tokens(usuario_id);