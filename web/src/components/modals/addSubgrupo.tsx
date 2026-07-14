import type { GrupoInterface } from "../../types/type";

interface AddSubgrupoProps {
  onSave: (subgrupo: GrupoInterface) => void;

  onClose: () => void;
}

export default function AddSubgrupo({ onSave, onClose }: AddSubgrupoProps) {
  function salvar() {
    const novoSubgrupo: GrupoInterface = {
      id: Date.now(),
      nome: "Novo Subgrupo",
      parentId: Date.now() + 1,
    };

    onSave(novoSubgrupo);
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
