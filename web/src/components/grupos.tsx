import Grupo from "./grupo";
import type {
  GrupoInterface,
  MembroInterface,
} from "../types/type";
import { ModalWrapper, type ModalType } from "./modals/ModalWrapper";
import { useState } from "react";
import AdicionarGrupo from "./modals/AdicionarGrupo";

interface GruposProps {
  grupoPai: string | null;
  grupos: GrupoInterface[];
  membros: MembroInterface[];
  todosGrupos: GrupoInterface[];
  todosMembros: MembroInterface[];
  onChange?: () => void;
}

export default function Grupos({
  grupoPai,
  grupos,
  todosGrupos,
  todosMembros,
  membros,
  onChange,
}: Readonly<GruposProps>) {
  const [modalType, setModalType] = useState<ModalType>(null);
  const fecharModal = () => setModalType(null);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-sm text-secondary">
        <span>Grupos ({grupos.length})</span>
        { (
          <button
            className="w-5 h-5 flex items-center justify-center bg-primary-accent text-text-primary rounded transition-colors duration-200 hover:bg-primary cursor-pointer"
            onClick={() => setModalType("adicionarGrupo")}
          >
            +
          </button>
        )}
      </div>

      {grupos.length === 0 ? (
        <span className="text-sm text-secondary">
          Nenhum grupo criado ainda.
        </span>
      ) : (
        <div className="flex flex-col gap-2">
          {grupos
            .filter((g) => g.grupoPaiId === grupoPai)
            .map((g) => (
              <Grupo
                key={g.id}
                grupo={g}
                todosGrupos={todosGrupos}
                todosMembros={todosMembros}
                membros={membros}
                onDadosChange={onChange}
              />
            ))}
        </div>
      )}

      <ModalWrapper tipo={modalType} onClose={fecharModal}>
        {modalType === "adicionarGrupo" && (
          <AdicionarGrupo
            onClose={fecharModal}
            grupoPaiId={grupoPai}
            onGrupoCriado={onChange}
          />
        )}
      </ModalWrapper>
    </div>
  );
}
