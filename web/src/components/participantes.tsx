import { useState, type ChangeEvent } from "react";
import type { MembroInterface } from "../types/type";
import { isMembroDoGrupo, isAdminDoGrupo } from "../utils/grupoUtils";
import Participante from "./participante";
import AdicionarMembro from "./modals/AdicionarMembro";
import EntrarNoGrupo from "./modals/EntrarNoGrupo";
import SairDoGrupo from "./modals/SairDoGrupo";
import { useParticipanteAtual } from "../hooks/useParticipanteAtual";
import { membroService } from "../services/membroService";

type MembroStatus = "todos" | "comGrupo" | "semGrupo";

interface ParticipantesProp {
  grupoId: string;
  grupoPaiId: string | null;
  membros: MembroInterface[];  
  todosMembros: MembroInterface[];  
  membrosComSubgrupo?: MembroInterface[];
  maxParticipantes?: number;
  mostrarFiltro?: boolean;
  onMembrosChange?: () => void;
}

export default function Participantes({
  grupoId,
  grupoPaiId,
  membros = [],
  todosMembros = [],
  membrosComSubgrupo = [],
  maxParticipantes = 100,
  mostrarFiltro = true,
  onMembrosChange
}: Readonly<ParticipantesProp>) {
  const { participanteAtual } = useParticipanteAtual();
  const euId = participanteAtual?.id;
  const [status, setStatus] = useState<MembroStatus>("todos");
  const [modalAdicionar, setModalAdicionar] = useState(false);
  const [modalEntrar, setModalEntrar] = useState(false);
  const [modalSair, setModalSair] = useState(false);

  const souAdmin = isAdminDoGrupo(euId!, grupoId, membros);
  const souMembro = isMembroDoGrupo(euId!, grupoId, membros);
  const souMembroDoPai = grupoPaiId ? isMembroDoGrupo(euId!, grupoPaiId, membros) : false;

  const membrosAdicionaveis = grupoPaiId
    ? todosMembros.filter(
        (m) =>
          isMembroDoGrupo(m.participanteId, grupoPaiId, membros) &&
          !isMembroDoGrupo(m.participanteId, grupoId, membros),
      )
    : [];

  const handleStatusChange = (evento: ChangeEvent<HTMLInputElement>) => {
    setStatus(evento.target.value as MembroStatus);
  };

  const idsComSubgrupo = new Set(membrosComSubgrupo.map((m) => m.participanteId));
  const comGrupo = membros.filter((m) => idsComSubgrupo.has(m.participanteId));
  const semGrupo = membros.filter((m) => !idsComSubgrupo.has(m.participanteId));

  let membrosFiltrados;
  switch (status) {
    case "comGrupo":
      membrosFiltrados = comGrupo;
      break;
    case "semGrupo":
      membrosFiltrados = semGrupo;
      break;
    default:
      membrosFiltrados = membros;
  }

  function handleClickAcao() {
    if (membros.length >= maxParticipantes) {
      alert("Limite de participantes atingido!");
      return;
    }
    if (souAdmin) setModalAdicionar(true);
    else if (!souMembro && souMembroDoPai) setModalEntrar(true);
    else if (souMembro) setModalSair(true);
  }

  let textoAcao = null;
  if (souAdmin) {
    textoAcao = "+";
  } else if (!souMembro && souMembroDoPai) {
    textoAcao = "Entrar";
  } else if (souMembro) {
    textoAcao = "Sair";
  }

  async function handleRemoverMembro(id: string) {
    try {
      await membroService.removerMembro(id, grupoId);
      onMembrosChange?.();
      setModalSair(false);
    } catch {
      alert("Erro ao remover grupo");
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 flex-wrap text-sm">
        {mostrarFiltro && (
          <div className="flex flex-row flex-wrap gap-3">
            <label className="flex items-center gap-1">
              <input type="radio" name="statusMembro" value="todos" checked={status === "todos"} onChange={handleStatusChange} className="accent-primary w-4 h-4" />
              <span>Todos ({membros.length})</span>
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" name="statusMembro" value="comGrupo" checked={status === "comGrupo"} onChange={handleStatusChange} className="accent-primary w-4 h-4" />
              <span>Com Grupo ({comGrupo.length})</span>
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" name="statusMembro" value="semGrupo" checked={status === "semGrupo"} onChange={handleStatusChange} className="accent-primary w-4 h-4" />
              <span>Sem Grupo ({semGrupo.length})</span>
            </label>
          </div>
        )}

        {textoAcao && (
          <button
            className="px-2 h-5 flex items-center justify-center bg-primary-accent text-text-primary rounded text-xs transition-colors duration-200 hover:bg-primary cursor-pointer"
            onClick={handleClickAcao}
          >
            {textoAcao}
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-1">
        {membrosFiltrados.length === 0 ? (
          <span className="text-sm text-secondary">Nenhum membro encontrado.</span>
        ) : (
          membrosFiltrados.map((m) => (
            <Participante
              key={m.participanteId} 
              participante={{
                id: m.participanteId,
                nome: m.nomeMembro,
                fotoUrl: m.fotoMembro!
              }}
              grupoId={grupoId}
              souAdmin={souAdmin}
              onRemover={handleRemoverMembro}
            />
          ))
        )}
      </div>

      {souAdmin && (
        <AdicionarMembro
          isOpen={modalAdicionar}
          grupoId={grupoId}
          candidatos={membrosAdicionaveis}
          onClose={() => setModalAdicionar(false)}
        />
      )}

      {!souMembro && souMembroDoPai && euId && (
        <EntrarNoGrupo
          isOpen={modalEntrar}
          participanteId={euId}
          grupoId={grupoId}
          onClose={() => setModalEntrar(false)}
        />
      )}

      {souMembro && euId &&  (
        <SairDoGrupo
          isOpen={modalSair}
          participanteId={euId}
          grupoId={grupoId}
          onClose={() => setModalSair(false)}
        />
      )}
    </div>
  );
}
