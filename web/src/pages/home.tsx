import { useCallback, useEffect, useState } from "react";
import Footer from "../components/layout/footer";
import Grupos from "../components/grupos";
import Header from "../components/layout/header/header";
import EntrarPorConvite from "../components/modals/EntrarPorConvite";
import {
  ModalWrapper,
  type ModalType,
} from "../components/modals/ModalWrapper";
import type {
  GrupoInterface,
  ParticipanteInterface,
  MembroInterface,
} from "../types/type";
import { grupoService } from "../services/grupoService";
import { ParticipanteAtualProvider } from "../contexts/ParticipanteAtualContext";

export default function Home() {
  const [grupos, setGrupos] = useState<GrupoInterface[]>([]);
  const [participantes, setParticipantes] = useState<ParticipanteInterface[]>(
    [],
  );
  const [membros, setMembros] = useState<MembroInterface[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erroCarregamento, setErroCarregamento] = useState<string | null>(null);
  const [modalType, setModalType] = useState<ModalType>(null);
  const fecharModal = () => setModalType(null);

  const carregarDados = useCallback(async () => {
    try {
      const dados = await grupoService.carregarDadosIniciais();
      setGrupos(dados.grupos);
      setParticipantes(dados.participantes);
      setMembros(dados.membros);
      setErroCarregamento(null);
    } catch {
      setErroCarregamento("Não foi possível carregar os dados.");
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    carregarDados();
  }, [carregarDados]);

  const gruposRaiz = grupos.filter((g) => g.grupoPaiId === null);

  return (
    <ParticipanteAtualProvider>
      <div className="flex flex-col min-h-screen">
        <Header />

        <div className="flex-1 p-4 ml-10 mr-10">
          {carregando && <p className="text-secondary">Carregando grupos...</p>}
          {erroCarregamento && (
            <p className="text-red-600">{erroCarregamento}</p>
          )}

          {!carregando && !erroCarregamento && (
            <>
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => setModalType("entrarPorConvite")}
                  className="text-sm rounded px-3 py-1 bg-primary-accent text-text-primary hover:bg-primary"
                >
                  Entrar por convite
                </button>
              </div>

              <Grupos
                grupoPai={null}
                grupos={gruposRaiz}
                todosGrupos={grupos}
                todosParticipantes={participantes}
                membros={membros}
                permiteAdicionar
                onChange={carregarDados}
              />

              <ModalWrapper tipo={modalType} onClose={fecharModal}>
                {modalType === "entrarPorConvite" && (
                  <EntrarPorConvite
                    onClose={fecharModal}
                    onEntrou={carregarDados}
                  />
                )}
              </ModalWrapper>
            </>
          )}
        </div>

        <Footer />
      </div>
    </ParticipanteAtualProvider>
  );
}
