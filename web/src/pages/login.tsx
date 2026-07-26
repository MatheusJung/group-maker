import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useState } from "react";
import axios from "axios";
import { authService } from "../services/authService";
import { validacoes } from "../utils/validacoes";
import { useAuth } from "../hooks/useAuth";
import type { TokenResponse } from "../types/auth";

export default function Login() {
  const navigate = useNavigate();
  const { loginContexto } = useAuth();
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = async () => {
    setErro("");
    if (!validacoes.validarUsuario(usuario)) {
      setErro("O usuário inserido é inválido. Use apenas letras e números.");
      return;
    }

    try {
      const respostaApi: TokenResponse = await authService.login({
        nome: usuario,
        senha,
      });
      console.log("Login efetuado com sucesso!");

      loginContexto({
        usuarioId: respostaApi.usuarioId,
      });

      navigate("/home");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setErro(
          err.response?.data?.message ||
            "Erro ao realizar login. Tente novamente.",
        );
      } else {
        setErro("Ocorreu um erro inesperado.");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex bg-linear-to-br from-primary-light via-primary to-primary-accent items-center justify-center">
        <form
          className="p-10 rounded w-100 bg-white shadow-md flex flex-col gap-4"
            onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">Entrar</h1>
            <img className="w-30 h-10" src={logo} alt="Logo" />
          </div>
          {erro && (
            <p className="bg-red-100 text-red-700 p-2 rounded text-sm text-center font-medium">
              {erro}
            </p>
          )}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label htmlFor="usuario-input" className="text-sm font-medium text-gray-700">
                Nome de usuário
              </label>
              <input
                id="usuario-input"
                className="w-full rounded border p-2 focus:outline-primary"
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Nome de usuário"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="senha-input" className="text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                id="senha-input"
                className="w-full rounded border p-2 focus:outline-primary"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Sua senha super secreta"
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <button
              type="submit"
              className="w-full rounded bg-primary-accent px-4 py-2 text-white font-medium hover:bg-primary transition-colors cursor-pointer"
            >
              Entrar
            </button>
            <button
              type="button"
              className="w-full rounded border border-gray-300 px-4 py-2 text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer text-center text-sm"
              onClick={() => navigate("/registro")}
            >
              Não tem conta? Cadastre-se aqui
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
