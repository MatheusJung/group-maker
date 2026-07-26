import { useState } from "react";
import fotoPadrao from "../assets/participante.png";
import type { ParticipanteInterface } from "../types/type";
import RemoverMembro from "./modals/RemoverMembro";

interface ParticipanteProps {
  participante: ParticipanteInterface;
  grupoId: string;
  souAdmin: boolean;
  onRemover: (participanteId: string, grupoId: string) => Promise<void>;
}

export default function Participante({
  participante,
  grupoId,
  souAdmin,
  onRemover,
}: Readonly<ParticipanteProps>) {
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <>
      <li
        onClick={souAdmin ? () => setModalAberto(true) : undefined}
        className={`relative flex flex-col items-center justify-center border border-secondary p-1 rounded transition-colors duration-200 w-20 h-20 truncate ${
          souAdmin
            ? "cursor-pointer hover:bg-primary-light hover:border-primary-light hover:text-text-primary"
            : "cursor-default"
        }`}
      >
        <img
          className="bg-white h-15 w-15 rounded"
          src={participante.fotoUrl || fotoPadrao}
          alt="Foto do participante"
        />
        <span className="text-xs">{participante.nome}</span>

        {souAdmin && (
          <span className="absolute bottom-0 right-0 translate-x-1 translate-y-1 bg-primary text-text-primary text-[9px] font-bold px-1 rounded leading-tight">
            ADM
          </span>
        )}
      </li>

      {souAdmin && (
        <RemoverMembro
          isOpen={modalAberto}
          participante={participante}
          grupoId={grupoId}
          onSave={onRemover}
          onClose={() => setModalAberto(false)}
        />
      )}
    </>
  );
}