import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useParticipanteAtual } from "../../../hooks/useParticipanteAtual";
import { authService } from "../../../services/authService";
import { ModalWrapper, type ModalType } from "../../modals/ModalWrapper";
import participante from "../../../assets/participante.png";
import AlterarFoto from "./modals/AlterarFoto";
import AlterarPerfil from "./modals/AlterarPerfil";
import ApagarConta from "./modals/ApagarConta";
import logo from "../../../assets/logo.svg"

export default function Header() {
  const navigate = useNavigate();
  const { participanteAtual } = useParticipanteAtual();
  const {logoutContexto} = useAuth();
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarPadrao = participante;

  const [modalType, setModalType] = useState<ModalType>(null);
  const fecharModal = () => setModalType(null);

  useEffect(() => {
    function cliqueFora(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownAberto(false);
      }
    }
    document.addEventListener("mousedown", cliqueFora);
    return () => document.removeEventListener("mousedown", cliqueFora);
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      logoutContexto();
      navigate("/login");
    } catch (err) {
      console.error("Erro ao deslogar:", err);
    }
  };

  return (
    <div className="flex justify-between items-center p-3 bg-white relative">
      <button
        onClick={() => navigate("/home")}
        className="cursor-pointer focus:outline-none"
      >
        <img className="w-30 h-10" src={logo} alt="Logo" />
      </button>

      <div ref={dropdownRef}>
        <button
          className="
        flex items-center justify-center 
        transition-colors duration-200 
        p-1 gap-0.5 cursor-pointer
        hover:bg-primary-light hover:border-primary-light rounded hover:text-text-primary"
          onClick={() => setDropdownAberto(!dropdownAberto)}
        >
          <span className="text-sm font-medium text-gray-700 hidden sm:inline">
            {participanteAtual?.nome || "Usuário"}
          </span>
          <img
            className="h-8 w-8 bg-white border border-secondary rounded"
            src={participanteAtual?.fotoUrl || avatarPadrao}
            alt="Menu"
          />
          <span>▾</span>
        </button>

        {dropdownAberto && (
          <div className="absolute right-0 top-12 w-48 bg-white border border-gray-100 rounded-md shadow-lg py-1 z-50">
            <button 
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer" 
              onClick={() => { setModalType("foto"); setDropdownAberto(false); }}
            >
              Alterar Foto
            </button>
            
            <button 
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer" 
              onClick={() => { setModalType("perfil"); setDropdownAberto(false); }}
            >
              Editar Perfil
            </button>
            
            <button 
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer" 
              onClick={() => { setModalType("apagar"); setDropdownAberto(false); }}
            >
              Apagar Conta
            </button>
            
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 cursor-pointer"
            >
              Sair
            </button>
          </div>
        )}
      </div>
      <ModalWrapper tipo={modalType} onClose={fecharModal}>
        {modalType === "foto" && <AlterarFoto onClose={fecharModal} />}
        {modalType === "perfil" && <AlterarPerfil onClose={fecharModal} />}
        {modalType === "apagar" && <ApagarConta onClose={fecharModal} />}
      </ModalWrapper>
    </div>
  );
}
