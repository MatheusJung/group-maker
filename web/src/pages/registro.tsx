import logo from "../assets/logo.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import axios from "axios";
import { validacoes } from "../utils/validacoes";

export function Registro() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setSucesso(false);

    if (!validacoes.validarNome(nome)) {
      setErro(
        "O nome deve conter apenas letras, espaços ou pontos (ex: Nome S.).",
      );
      return;
    }

    if (!validacoes.validarUsuario(usuario)) {
      setErro(
        "O usuário deve conter apenas letras e números, sem caracteres especiais ou espaços.",
      );
      return;
    }

    if (!validacoes.validarSenha(senha)) {
      setErro(
        "A senha deve ter no mínimo 6 caracteres, incluindo letras maiúsculas, minúsculas e número.",
      );
      return;
    }

    try {
      await authService.cadastrar({
        nomeUsuario: usuario,
        senha,
        nome,
      });

      setSucesso(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setErro(
          err.response?.data?.message ||
            "Erro ao criar conta. Tente novamente.",
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
          onSubmit={handleCadastro}
        >
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">Criar Conta</h1>
            <img className="w-30 h-10" src={logo} alt="Logo" />
          </div>

          {erro && (
            <p className="bg-red-100 text-red-700 p-2 rounded text-sm text-center font-medium">
              {erro}
            </p>
          )}

          {sucesso && (
            <p className="bg-green-100 text-green-700 p-2 rounded text-sm text-center font-medium">
              Conta criada com sucesso! Redirecionando...
            </p>
          )}

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Nome</label>
              <input
                className="w-full rounded border p-2 focus:outline-primary"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Nome S."
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Nome de usuário
              </label>
              <input
                className="w-full rounded border p-2 focus:outline-primary"
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Usuario"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Senha</label>
              <input
                className="w-full rounded border p-2 focus:outline-primary"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Sua senha super secreta aqui"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <button
              type="submit"
              className="w-full rounded bg-primary-accent px-4 py-2 text-white font-medium hover:bg-primary transition-colors cursor-pointer"
            >
              Cadastrar
            </button>

            <button
              type="button"
              className="w-full rounded border border-gray-300 px-4 py-2 text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer text-center text-sm"
              onClick={() => navigate("/login")}
            >
              Já possui uma conta? Voltar para o Login
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
