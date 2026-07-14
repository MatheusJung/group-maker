import { useState } from "react";
import type {
  GrupoInterface,
  ParticipanteInterface,
  MembroInterface,
  ModalType,
} from "../types/type";
import Modal from "./modals/modal";
import { modalTitles, obterComponenteModal } from "./modals/modalConfig";
import Participantes from "./participantes";
import Grupos from "./grupos";

interface GrupoProp {
  grupo: GrupoInterface;
  todosGrupos: GrupoInterface[];
  todosParticipantes: ParticipanteInterface[];
  membros: MembroInterface[];
  onAdicionarSubgrupo: (parentId: number) => void;
  onAdicionarParticipante: (grupoId: number) => void;
  maxSubgrupos?: number;
  maxParticipantes?: number;
}

type Secao = "membros" | "grupos" | null;

function Painel({
  aberto,
  children,
}: {
  aberto: boolean;
  children: React.ReactNode;
}) {
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
  todosParticipantes,
  membros,
  onAdicionarSubgrupo,
  onAdicionarParticipante,
  maxSubgrupos = 100,
  maxParticipantes = 10,
}: GrupoProp) {
  const [modalType, setModalType] = useState<ModalType>(null);
  const modalEstaAberto = modalType !== null;
  const abrirModal = (tipo: Exclude<ModalType, null>) => setModalType(tipo);
  const fecharModal = () => setModalType(null);

  const ehRaiz = grupo.parentId === null;

  const [secaoAberta, setSecaoAberta] = useState<Secao>("membros");
  const alternarSecao = (secao: Exclude<Secao, null>) =>
    setSecaoAberta((atual) => (atual === secao ? null : secao));

  const filhos = todosGrupos.filter((g) => g.parentId === grupo.id);
  const membrosDoGrupo = membros.filter((m) => m.grupoId === grupo.id);
  const participantesDoGrupo = todosParticipantes.filter((p) =>
    membrosDoGrupo.some((m) => m.participanteId === p.id),
  );

  const idsFilhos = new Set(filhos.map((f) => f.id));
  const membrosComSubgrupo = ehRaiz
    ? membros.filter((m) => idsFilhos.has(m.grupoId))
    : [];

  function handleAdicionarSubgrupo() {
    if (filhos.length >= maxSubgrupos) {
      alert("Limite de subgrupos atingido!");
      return;
    }
    onAdicionarSubgrupo(grupo.id);
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
          participantes={participantesDoGrupo}
          membrosComSubgrupo={membrosComSubgrupo}
          mostrarFiltro={ehRaiz}
          onAdicionar={() => onAdicionarParticipante(grupo.id)}
        />
      </Painel>

      {ehRaiz && (
        <Painel aberto={secaoAberta === "grupos"}>
          <Grupos
            grupos={filhos}
            todosGrupos={todosGrupos}
            todosParticipantes={todosParticipantes}
            membros={membros}
            onAdicionarSubgrupo={onAdicionarSubgrupo}
            onAdicionarParticipante={onAdicionarParticipante}
            onAbrirModalAdicionar={() => abrirModal("subgrupo")}
          />
        </Painel>
      )}

      <Modal
        isOpen={modalEstaAberto}
        title={modalType ? modalTitles[modalType] : ""}
        onClose={fecharModal}
      >
        {obterComponenteModal(modalType, {
          onClose: fecharModal,
          onAdicionarSubgrupo: handleAdicionarSubgrupo,
        })}
      </Modal>
    </div>
  );
}
