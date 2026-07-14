import { useState } from "react";
import Footer from "../components/layout/footer";
import Grupos from "../components/grupos";
import Header from "../components/layout/header";
import Modal from "../components/modals/modal";
import {
  modalTitles,
  obterComponenteModal,
} from "../components/modals/modalConfig";
import { adicionarMembro } from "../utils/grupoUtils";
import gruposData from "../data/grupos.json";
import participantesData from "../data/participantes.json";
import membrosData from "../data/membros.json";
import type {
  GrupoInterface,
  ParticipanteInterface,
  MembroInterface,
  ModalType,
} from "../types/type";

export default function Home() {
  const [grupos, setGrupos] = useState<GrupoInterface[]>(gruposData);
  const [participantes, setParticipantes] =
    useState<ParticipanteInterface[]>(participantesData);
  const [membros, setMembros] = useState<MembroInterface[]>(membrosData);

  const [modalType, setModalType] = useState<ModalType>(null);
  const modalEstaAberto = modalType !== null;
  const abrirModal = (tipo: Exclude<ModalType, null>) => setModalType(tipo);
  const fecharModal = () => setModalType(null);

  function adicionarGrupo(parentId: number | null = null): void {
    const novoGrupo: GrupoInterface = {
      id: Date.now(),
      nome: `Grupo ${grupos.length + 1}`,
      parentId,
    };
    setGrupos((prev) => [...prev, novoGrupo]);
  }

  function adicionarParticipanteAoGrupo(grupoId: number): void {
    const novoParticipante: ParticipanteInterface = {
      id: Date.now(),
      nome: `Participante ${participantes.length + 1}`,
    };
    setParticipantes((prev) => [...prev, novoParticipante]);
    setMembros((prev) =>
      adicionarMembro(novoParticipante.id, grupoId, prev, grupos),
    );
  }

  const gruposRaiz = grupos.filter((g) => g.parentId === null);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />

        <div className="flex-1 p-4 ml-10 mr-10">
          <Grupos
            grupos={gruposRaiz}
            todosGrupos={grupos}
            todosParticipantes={participantes}
            membros={membros}
            onAdicionarSubgrupo={adicionarGrupo}
            onAdicionarParticipante={adicionarParticipanteAoGrupo}
            onAbrirModalAdicionar={() => abrirModal("grupo")}
          />

          <Modal
            isOpen={modalEstaAberto}
            title={modalType ? modalTitles[modalType] : ""}
            onClose={fecharModal}
          >
            {obterComponenteModal(modalType, {
              onClose: fecharModal,
              onAdicionarGrupo: () => adicionarGrupo(null),
            })}
          </Modal>
        </div>

        <Footer />
      </div>
    </>
  );
}
