import Grupo from "./grupo";
import type {
  GrupoInterface,
  ParticipanteInterface,
  MembroInterface,
} from "../types/type";

interface GruposProps {
  grupos: GrupoInterface[];
  todosGrupos: GrupoInterface[];
  todosParticipantes: ParticipanteInterface[];
  membros: MembroInterface[];
  onAdicionarSubgrupo: (parentId: number) => void;
  onAdicionarParticipante: (grupoId: number) => void;
  onAbrirModalAdicionar: () => void;
}

export default function Grupos({
  grupos,
  todosGrupos,
  todosParticipantes,
  membros,
  onAdicionarSubgrupo,
  onAdicionarParticipante,
  onAbrirModalAdicionar,
}: GruposProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-sm text-secondary">
        <span>Grupos ({grupos.length})</span>
        <button
          className="w-5 h-5 flex items-center justify-center bg-primary-accent text-text-primary rounded transition-colors duration-200 hover:bg-primary cursor-pointer"
          onClick={onAbrirModalAdicionar}
        >
          +
        </button>
      </div>

      {grupos.length === 0 ? (
        <span className="text-sm text-secondary">
          Nenhum grupo criado ainda.
        </span>
      ) : (
        <div className="flex flex-col gap-2">
          {grupos.map((g) => (
            <Grupo
              key={g.id}
              grupo={g}
              todosGrupos={todosGrupos}
              todosParticipantes={todosParticipantes}
              membros={membros}
              onAdicionarSubgrupo={onAdicionarSubgrupo}
              onAdicionarParticipante={onAdicionarParticipante}
            />
          ))}
        </div>
      )}
    </div>
  );
}
