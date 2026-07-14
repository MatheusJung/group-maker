import { useState } from "react";
import type { ModalType } from "../types/type";

export default function useModal() {
  const [modalEstaAberto, setModalEstaAberto] = useState(false);

  const [modalType, setModalType] = useState<ModalType>(null);

  function abrirModal(tipo: Exclude<ModalType, null>) {
    setModalType(tipo);
    setModalEstaAberto(true);
  }

  function fecharModal() {
    setModalEstaAberto(false);
    setModalType(null);
  }

  return {
    modalEstaAberto,
    modalType,
    abrirModal,
    fecharModal,
  };
}
