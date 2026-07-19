import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import participante from "../../assets/participante.png";
import { useAuth } from "../../contexts/AuthContext";
import { authService } from "../../services/authService";
import useModal from "../../hooks/useModal";

export default function Header() {
  const navigate = useNavigate();
  const { usuario, logoutContexto } = useAuth();
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const avatarPadrao = participante;

  const { modalEstaAberto, modalType, abrirModal, fecharModal } = useModal();

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

      <div
        ref={dropdownRef}
      >
        <button         
        className="
        flex items-center justify-center 
        transition-colors duration-200 
        p-1 gap-0.5 cursor-pointer
        hover:bg-primary-light hover:border-primary-light rounded hover:text-text-primary"
          onClick={() => setDropdownAberto(!dropdownAberto)}
        >
          <span className="text-sm font-medium text-gray-700 hidden sm:inline">
            {usuario?.nome || "Usuário"} 
          </span>
          <img className="h-8 w-8 bg-white border border-secondary rounded" src={usuario?.fotoUrl || avatarPadrao} alt="Menu" />
          <span>▾</span>
        </button>

        {dropdownAberto && (
          <div className="absolute right-0 top-12 w-48 bg-white border border-gray-100 rounded-md shadow-lg py-1 z-50">
            <button
              onClick={() => {
                abrirModal("foto");
                setDropdownAberto(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              Alterar Foto
            </button>
            <button
              onClick={() => {
                abrirModal("perfil");
                setDropdownAberto(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              Alterar Perfil
            </button>
            <button
              onClick={() => {
                abrirModal("apagar");
                setDropdownAberto(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer font-medium"
            >
              Apagar Conta
            </button>
            <hr className="border-gray-100 my-1" />
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 cursor-pointer"
            >
              Sair
            </button>
          </div>
        )}
      </div>

      {modalEstaAberto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full shadow-xl">
            {/* MODAL DE FOTO */}
            {modalType === "foto" && (
              <>
                <h3 className="text-lg font-semibold mb-4">
                  Alterar Foto de Perfil
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Selecione um novo arquivo de imagem.
                </p>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={fecharModal}
                    className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button className="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary-accent">
                    Salvar
                  </button>
                </div>
              </>
            )}

            {modalType === "perfil" && (
              <>
                <h3 className="text-lg font-semibold mb-4">
                  Atualizar Informações
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Modifique os seus dados cadastrais.
                </p>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={fecharModal}
                    className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button className="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary-accent">
                    Atualizar
                  </button>
                </div>
              </>
            )}

            {/* MODAL DE APAGAR CONTA */}
            {modalType === "apagar" && (
              <>
                <h3 className="text-lg font-semibold text-red-600 mb-2">
                  Aviso de Exclusão
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Tem certeza absoluta que deseja apagar sua conta?
                </p>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={fecharModal}
                    className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700">
                    Excluir
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
