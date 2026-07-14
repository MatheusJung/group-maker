import { useState } from "react";
import type { GrupoInterface } from "../../types/type";

interface AddGrupoProps {
  onSave: (grupo: GrupoInterface) => void;
  onClose: () => void;
}

export default function AddGrupo({ onSave, onClose }: AddGrupoProps) {
  const [nome, setNome] = useState("");
  const [maxParticipantes, setMaxParticipantes] = useState(2);

  function salvar() {
    if (maxParticipantes < 2) {
      alert("O grupo deve permitir pelo menos 2 participantes.");
      return;
    }

    const novoUsuario: GrupoInterface = {
      id: Date.now(),
      nome: "Novo Grupo",
    };

    onSave(novoUsuario);
    onClose();
  }
  return (
    <form className="p-1">
      <div className="flex gap-2 p-1">
        <input
          type="text"
          placeholder="Nome do grupo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full rounded border p-2"
          required
        />
        <input
          type="Number"
          placeholder="Maximo de membros"
          value={maxParticipantes}
          onChange={(e) => setMaxParticipantes(Number(e.target.value))}
          className="w-full rounded border p-2"
          min={2}
          max={100}
        />
      </div>
      <div className="flex justify-end p-1">
        <button
          className="rounded bg-blue-600 px-4 py-2 text-white"
          onClick={salvar}
        >
          Salvar
        </button>
      </div>
    </form>
  );
}
