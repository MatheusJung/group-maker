import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function Login() {
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    navigate("/");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex bg-linear-to-br from-primary-light via-primary to-primary-accent items-center justify-center">
        <form className="p-10 rounded w-100  bg-white" onSubmit={handleSubmit}>
          <div className="flex justify-between">
            <h1 className="text-xl">Entrar</h1>
            <img className="w-30 h-10" src={logo} alt="" />
          </div>
          <div className="gap-2 p-1">
            <label htmlFor="">Nome de usuário</label>
            <input
              className="w-full rounded border p-2"
              type="text"
              placeholder="Nome de usuário"
              required
            />
            <label htmlFor="">Senha</label>
            <input
              className="w-full rounded border p-2"
              type="Password"
              placeholder="Sua senha super secreta"
              required
            />
          </div>
          <div className="flex justify-end p-1">
            <button className="rounded bg-primary-accent px-4 py-2 text-white hover:bg-primary">
              Entrar
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
