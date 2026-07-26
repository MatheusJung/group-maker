export interface GrupoInterface {
  id: string;
  nome: string;
  descricao?: string;
  //maxMembros?: number;
  fotoUrl: string;
  grupoPaiId: string | null;
}
export interface ParticipanteInterface {
  id: string;
  nome: string;
  fotoUrl?: string;
}
export interface MembroInterface {
  participanteId: string;
  grupoId: string;
  isAdmin: boolean;
  nomeMembro: string;
  fotoMembro: string | null;
}
export interface UsuarioInterface {
  id: string;
  nomeUsuario: string;
  senha: string;
}
