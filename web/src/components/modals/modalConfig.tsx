import AddParticipante from "./addParticipante";
import AddGrupo from "./addGrupo";
import AddSubgrupo from "./addSubgrupo";

import type {
  ModalType,
  GrupoInterface,
  ParticipanteInterface,
} from "../../types/type";

interface ModalProps {
  onClose: () => void;

  onAdicionarGrupo?: (grupo: GrupoInterface) => void;
  onAdicionarSubgrupo?: (subgrupo: GrupoInterface) => void;
  onAdicionarParticipante?: (participante: ParticipanteInterface) => void;
}

export const modalTitles: Record<Exclude<ModalType, null>, string> = {
  participante: "Novo Participante",
  grupo: "Novo Grupo",
  subgrupo: "Novo Subgrupo",
  foto: "Atualizar foto",
  perfil: "Atualizar perfil",
  apagar: "Apagar conta",
};

export function obterComponenteModal(tipo: ModalType, props: ModalProps) {
  switch (tipo) {
    case "participante":
      if (!props.onAdicionarParticipante) {
        return null;
      }
      return (
        <AddParticipante
          onSave={props.onAdicionarParticipante}
          onClose={props.onClose}
        />
      );
    case "grupo":
      if (!props.onAdicionarGrupo) {
        return null;
      }
      return (
        <AddGrupo onSave={props.onAdicionarGrupo} onClose={props.onClose} />
      );
    case "subgrupo":
      if (!props.onAdicionarSubgrupo) {
        return null;
      }
      return (
        <AddSubgrupo
          onSave={props.onAdicionarSubgrupo}
          onClose={props.onClose}
        />
      );
    default:
      return null;
  }
}
