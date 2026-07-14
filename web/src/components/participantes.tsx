import { useState, type ChangeEvent } from "react";
import type { ParticipanteInterface, MembroInterface } from "../types/type";
import Participante from "./participante";

type ParticipanteStatus = "todos" | "comGrupo" | "semGrupo";

interface ParticipantesProp {
  participantes: ParticipanteInterface[];
  membrosComSubgrupo?: MembroInterface[];
  maxParticipantes?: number;
  onAdicionar: () => void;
  mostrarFiltro?: boolean;
}

export default function Participantes({
  participantes,
  membrosComSubgrupo = [],
  maxParticipantes = 100,
  onAdicionar,
  mostrarFiltro = true,
}: ParticipantesProp) {
  const [status, setStatus] = useState<ParticipanteStatus>("todos");

  const handleStatusChange = (evento: ChangeEvent<HTMLInputElement>) => {
    setStatus(evento.target.value as ParticipanteStatus);
  };

  const idsComSubgrupo = new Set(
    membrosComSubgrupo.map((m) => m.participanteId),
  );
  const comGrupo = participantes.filter((p) => idsComSubgrupo.has(p.id));
  const semGrupo = participantes.filter((p) => !idsComSubgrupo.has(p.id));

  const participantesFiltrados =
    status === "comGrupo"
      ? comGrupo
      : status === "semGrupo"
        ? semGrupo
        : participantes;

  function handleAdicionar() {
    if (participantes.length >= maxParticipantes) {
      alert("Limite de participantes atingido!");
      return;
    }
    onAdicionar();
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 flex-wrap text-sm">
        {mostrarFiltro && (
          <div className="flex flex-row flex-wrap gap-3">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="statusParticipante"
                value="todos"
                checked={status === "todos"}
                onChange={handleStatusChange}
                className="accent-primary w-4 h-4"
              />
              <span>Todos ({participantes.length})</span>
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="statusParticipante"
                value="comGrupo"
                checked={status === "comGrupo"}
                onChange={handleStatusChange}
                className="accent-primary w-4 h-4"
              />
              <span>Com Grupo ({comGrupo.length})</span>
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="statusParticipante"
                value="semGrupo"
                checked={status === "semGrupo"}
                onChange={handleStatusChange}
                className="accent-primary w-4 h-4"
              />
              <span>Sem Grupo ({semGrupo.length})</span>
            </label>
          </div>
        )}

        <button
          className="w-5 h-5 flex items-center justify-center bg-primary-accent text-text-primary rounded transition-colors duration-200 hover:bg-primary cursor-pointer"
          onClick={handleAdicionar}
        >
          +
        </button>
      </div>

      <div className="flex flex-wrap gap-1">
        {participantesFiltrados.length === 0 ? (
          <span className="text-sm text-secondary">
            Nenhum participante encontrado.
          </span>
        ) : (
          participantesFiltrados.map((p) => (
            <Participante key={p.id} nome={p.nome} foto={p.foto} />
          ))
        )}
      </div>
    </div>
  );
}
