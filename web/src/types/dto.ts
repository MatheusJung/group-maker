export interface CriarGrupoRequest {
  nome: string;
  descricao?: string;
  maxMembros: number;
  grupoPaiId: string | null;
}

export interface AtualizarGrupoRequest {
  id: string;
  nome: string;
  descricao?: string;
  maxMembros: number;
}
