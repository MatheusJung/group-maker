import type { ParticipanteInterface } from "../../types/type";

interface AddParticipanteProps {
  onSave: (participante: ParticipanteInterface) => void;
  onClose: () => void;
}

export default function AddParticipante({
  onSave,
  onClose,
}: AddParticipanteProps) {
  function salvar() {
    const novoParticipante: ParticipanteInterface = {
      id: Date.now(),
      nome: "Novo Participante",
      isAdmin: false,
    };

    onSave(novoParticipante);
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
