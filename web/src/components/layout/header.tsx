import { useState } from "react";
import logo from "../../assets/logo.svg";
import Modal from "../modals/modal";
import { modalTitles, obterComponenteModal } from "../modals/modalConfig";
import type { ModalType, UsuarioInterface } from "../../types/type";

export default function Header() {
  const [modalType, setModalType] = useState<ModalType>(null);
  const modalEstaAberto = modalType !== null;
  const abrirModal = (tipo: Exclude<ModalType, null>) => {
    setModalType(tipo);
  };
  const fecharModal = () => {
    setModalType(null);
  };

  const [, setUsuarios] = useState<UsuarioInterface[]>([]);

  function adicionarUsuario(novoUsuario: UsuarioInterface) {
    setUsuarios((prev) => [...prev, novoUsuario]);
  }
  return (
    <div className="flex justify-between p-3 rounded">
      <a href="#">
        <img className="w-30 h-10" src={logo} alt="" />
      </a>
      <button
        className="bg-primary text-text-primary p-1 rounded transition-colors duration-200 hover:bg-primary-accent cursor-pointer"
        onClick={() => abrirModal("usuario")}
      >
        <span>Entrar</span>
      </button>

      <Modal
        isOpen={modalEstaAberto}
        title={modalType ? modalTitles[modalType] : ""}
        onClose={fecharModal}
      >
        {obterComponenteModal(modalType, {
          onClose: fecharModal,
          onAdicionarUsuario: adicionarUsuario,
        })}
      </Modal>
    </div>
  );
}
