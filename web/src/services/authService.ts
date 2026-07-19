import { apiPublica, api, setMemoriaAccessToken } from "./api";
import type {
  CadastroRequest,
  CadastroResponse,
  LoginRequest,
  TokenResponse,
} from "../types/auth";

export const authService = {
  //@PostMapping("/cadastro")
  cadastrar: async (
    dadosCadastro: CadastroRequest,
  ): Promise<CadastroResponse> => {
    const response = await apiPublica.post<CadastroResponse>(
      "/auth/cadastro",
      dadosCadastro,
    );
    return response.data;
  },

  //@PostMapping("/login")
  login: async (dadosLogin: LoginRequest): Promise<TokenResponse> => {
    const response = await apiPublica.post<TokenResponse>(
      "/auth/login",
      dadosLogin,
      {
        withCredentials: true,
      },
    );

    setMemoriaAccessToken(response.data.accessToken);
    return response.data;
  },

  //@PostMapping("/logout")
  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
    setMemoriaAccessToken("");
  },
};
