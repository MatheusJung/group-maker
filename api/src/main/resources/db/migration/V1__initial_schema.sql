CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome_usuario VARCHAR(20) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE membros (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(100) NOT NULL,
    foto_url VARCHAR(255),
    usuario_id UUID NOT NULL,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_membros_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE
);

CREATE TABLE grupos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(100) NOT NULL,
    foto_url VARCHAR(255),
    descricao TEXT,
    grupo_pai_id UUID,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_grupo_pai
        FOREIGN KEY (grupo_pai_id)
        REFERENCES grupos(id)
        ON DELETE CASCADE
);

CREATE TABLE grupos_membros (

    grupo_id UUID NOT NULL,
    membro_id UUID NOT NULL,

    is_admin BOOLEAN NOT NULL DEFAULT FALSE,

    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT pk_membros_grupos
        PRIMARY KEY (grupo_id, membro_id),

    CONSTRAINT fk_membros_grupos_grupo
        FOREIGN KEY (grupo_id)
        REFERENCES grupos(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_membros_grupos_membro
        FOREIGN KEY (membro_id)
        REFERENCES membros(id)
        ON DELETE CASCADE
);