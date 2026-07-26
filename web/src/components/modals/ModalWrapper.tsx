import React from "react";

export type ModalType =
  | "foto"
  | "perfil"
  | "apagar"
  | "adicionarGrupo"
  | "editarGrupo"
  | "removerGrupo"
  | "adicionarMembro"
  | "removerMembro"
  | "entrarNoGrupo"
  | "saidDoGrupo"
  | "compartilharConvite"
  | "entrarPorConvite"
  | null;

// eslint-disable-next-line react-refresh/only-export-components
export const modalTitles: Record<Exclude<ModalType, null>, string> = {
  foto: "Atualizar foto",
  perfil: "Atualizar perfil",
  apagar: "Apagar conta",
  adicionarGrupo: "Adicionar membro ao Grupo",
  editarGrupo: "Editar no Grupo",
  removerGrupo: "Remover no Grupo",
  adicionarMembro: "Adicionar novo membro ao grupo",
  removerMembro: "Remover membro ao grupo",
  entrarNoGrupo: "Entrar no grupo",
  saidDoGrupo: "Sair do grupo",
  compartilharConvite: "Código do grupo",
  entrarPorConvite: "Entrar utilizando código do grupo"
};

interface ModalWrapperProps {
  tipo: ModalType;
  onClose: () => void;
  children: React.ReactNode;
}

export function ModalWrapper({ tipo, onClose, children }: Readonly<ModalWrapperProps>) {
  if (!tipo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="w-full max-w-md rounded bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between rounded-t bg-primary text-text-primary">
          <h2 className="text-xl p-1 font-semibold">{modalTitles[tipo]}</h2>
          <button className="rounded p-1 text-text-primary hover:bg-gray-100 hover:text-black" onClick={onClose}>×</button>
        </div>
        <div className="p-2">
          {children}
        </div>
      </div>
    </div>
  );
}