import type { UsuarioInterface } from "../../types/type";

interface AddUsuarioProps {
  onSave: (usuario: UsuarioInterface) => void;
  onClose: () => void;
}

export default function AddUsuario({ onSave, onClose }: AddUsuarioProps) {
  function salvar() {
    const novoUsuario: UsuarioInterface = {
      id: Date.now(),
      nomeUsuario: "Novo Usuario",
      senha: "Nova Senha",
    };

    onSave(novoUsuario);
    onClose();
  }
  return (
    <form className="space-y-3">
      <input placeholder="Nome" className="w-full rounded border p-2" />
      <input
        placeholder="Maximo de membros"
        className="w-full rounded border p-2"
      />

      <button
        className="rounded bg-blue-600 px-4 py-2 text-white"
        onClick={salvar}
      >
        Salvar
      </button>
    </form>
  );
}
