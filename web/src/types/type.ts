export interface GrupoInterface {
  id: number;
  nome: string;
  descricao?: string;
  maxParticipantes?: number;
  parentId: number | null;
}

export interface ParticipanteInterface {
  id: number;
  nome: string;
  foto?: string;
}

export interface MembroInterface {
  participanteId: number;
  grupoId: number;
  isAdmin: boolean;
}

export interface UsuarioInterface {
  id: number;
  nomeUsuario: string;
  senha: string;
}

export type ModalType =
  | "participante"
  | "grupo"
  | "subgrupo"
  | "foto"
  | "perfil"
  | "apagar"
  | null;
