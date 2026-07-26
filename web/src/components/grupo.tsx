import { useState, type ReactNode } from "react";
import type {
  GrupoInterface,
  MembroInterface,
} from "../types/type";
import { isMembroDoGrupo, isAdminDoGrupo } from "../utils/grupoUtils";
import Participantes from "./participantes";
import Grupos from "./grupos";
import AdicionarGrupo from "./modals/AdicionarGrupo";
import EditarGrupo from "./modals/EditarGrupo";
import RemoverGrupo from "./modals/RemoverGrupo";
import CompartilharConvite from "./modals/CompartilharConvite";
import { useParticipanteAtual } from "../hooks/useParticipanteAtual";
import { grupoService } from "../services/grupoService";
import { ModalWrapper, type ModalType } from "./modals/ModalWrapper";

interface GrupoProp {
  grupo: GrupoInterface;
  membros: MembroInterface[];
  todosGrupos: GrupoInterface[];
  todosMembros: MembroInterface[];
  maxSubgrupos?: number;
  maxParticipantes?: number;
  onDadosChange?: () => void;
}

type Secao = "membros" | "grupos" | null;

function Painel({
  aberto,
  children,
}: Readonly<{ aberto: boolean; children: ReactNode }>) {
  return (
    <div
      className={`grid transition-all duration-300 ease-in-out ${
        aberto
          ? "grid-rows-[1fr] opacity-100 mt-1 p-2"
          : "grid-rows-[0fr] opacity-0 pointer-events-none"
      }`}
    >
      <div className="overflow-hidden flex flex-col gap-2">{children}</div>
    </div>
  );
}

export default function Grupo({
  grupo,
  todosGrupos,
  todosMembros,
  membros,
  maxParticipantes = 10,
  onDadosChange,
}: Readonly<GrupoProp>) {
  const { participanteAtual } = useParticipanteAtual();
  const euId = participanteAtual?.id;

  const [codigoConvite, setCodigoConvite] = useState<string | null>(null);
  const [modalType, setModalType] = useState<ModalType>(null);
  const fecharModal = () => setModalType(null);

  const ehRaiz = grupo.grupoPaiId === null;
  const souAdmin = isAdminDoGrupo(euId!, grupo.id, membros);
  const souMembro = isMembroDoGrupo(euId!, grupo.id, membros);

  const [secaoAberta, setSecaoAberta] = useState<Secao>("membros");
  const alternarSecao = (secao: Exclude<Secao, null>) =>
    setSecaoAberta((atual) => (atual === secao ? null : secao));

  const filhos = todosGrupos.filter((g) => g.grupoPaiId === grupo.id);
  
  // Agora filtramos os membros diretamente pelo grupoId recebido do DTO
  const membrosDoGrupo = membros.filter((m) => m.grupoId === grupo.id);

  const filhosIds = new Set(filhos.map((f) => f.id));
  const membrosComSubgrupo = ehRaiz
    ? membros.filter((m) => filhosIds.has(m.grupoId))
    : [];

  async function handleAbrirConvite() {
    try {
      const codigo = await grupoService.obterConvite(grupo.id);
      setCodigoConvite(codigo);
      setModalType("compartilharConvite");
    } catch {
      alert("Erro ao gerar código de convite");
    }
  }

  return (
    <div className="border border-primary rounded shadow-md">
      <div
        className={`flex items-center gap-2 p-1 rounded-t ${
          ehRaiz
            ? "bg-primary text-white font-semibold"
            : "bg-primary-accent text-text-primary"
        }`}
      >
        <span className="flex-1 truncate">{grupo.nome}</span>

        {souAdmin && (
          <>
            <button
              onClick={() => setModalType("editarGrupo")}
              className="w-5 h-5 flex items-center justify-center rounded text-xs hover:bg-primary cursor-pointer"
            >
              Editar
            </button>
            <button
              onClick={() => setModalType("removerGrupo")}
              className="w-5 h-5 flex items-center justify-center rounded text-xs hover:bg-primary cursor-pointer"
            >
              Deletar
            </button>
            {ehRaiz && (
              <button
                onClick={handleAbrirConvite}
                className="w-5 h-5 flex items-center justify-center rounded text-xs hover:bg-primary cursor-pointer"
              >
                Convidar
              </button>
            )}
          </>
        )}

        <button
          onClick={() => alternarSecao("membros")}
          aria-expanded={secaoAberta === "membros"}
          className={`flex items-center gap-1 px-2 py-1 rounded text-sm transition-colors duration-200 hover:bg-primary cursor-pointer ${
            secaoAberta === "membros" ? "bg-primary" : "bg-primary-accent"
          }`}
        >
          <span>
            Membros ({membrosDoGrupo.length}/{maxParticipantes})
          </span>
          <span
            className={`transform transition-transform duration-200 ${
              secaoAberta === "membros" ? "rotate-180" : ""
            }`}
          >
            ▾
          </span>
        </button>

        {ehRaiz && (
          <button
            onClick={() => alternarSecao("grupos")}
            aria-expanded={secaoAberta === "grupos"}
            className={`flex items-center gap-1 px-2 py-1 rounded text-sm transition-colors duration-200 hover:bg-primary cursor-pointer ${
              secaoAberta === "grupos" ? "bg-primary" : "bg-primary-accent"
            }`}
          >
            <span>Grupo ({filhos.length})</span>
            <span
              className={`transform transition-transform duration-200 ${
                secaoAberta === "grupos" ? "rotate-180" : ""
              }`}
            >
              ▾
            </span>
          </button>
        )}
      </div>

      <Painel aberto={secaoAberta === "membros"}>
        <Participantes
          grupoId={grupo.id}
          grupoPaiId={grupo.grupoPaiId}
          membros={membrosDoGrupo}
          todosMembros={todosMembros}
          membrosComSubgrupo={membrosComSubgrupo}
          mostrarFiltro={ehRaiz}
          maxParticipantes={maxParticipantes}
          onMembrosChange={onDadosChange}
        />
      </Painel>

      {ehRaiz && (
        <Painel aberto={secaoAberta === "grupos"}>
          <Grupos
            grupoPai={grupo.id}
            grupos={filhos}
            todosGrupos={todosGrupos}
            todosMembros={todosMembros}
            membros={membros}
          />
        </Painel>
      )}

      <ModalWrapper tipo={modalType} onClose={fecharModal}>
        {modalType === "adicionarGrupo" && (
          <AdicionarGrupo grupoPaiId={grupo.id} onClose={fecharModal} />
        )}
        {modalType === "editarGrupo" && (
          <EditarGrupo grupo={grupo} onClose={fecharModal} />
        )}
        {modalType === "removerGrupo" && (
          <RemoverGrupo grupo={grupo} onClose={fecharModal} isOpen />
        )}
        {modalType === "compartilharConvite" && (
          <CompartilharConvite codigoConvite={codigoConvite} />
        )}
      </ModalWrapper>
    </div>
  );
}
