export interface CadastroRequest {
  nomeUsuario: string;
  senha: string;
  nome: string;
}

export interface CadastroResponse {
  id: string;
  usuario: string;
}

export interface LoginRequest {
  nome: string;
  senha?: string;
}

export interface TokenResponse {
  accessToken: string;
  usuarioId: string;
}
