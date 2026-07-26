import ConfirmarAcao from "./ConfirmarAcao";
import { membroService } from "../../services/membroService";

interface EntrarNoGrupoProps {
  isOpen: boolean;
  participanteId: string;
  grupoId: string;
  onClose: () => void;
  onMembrosChange?: () => void;
}

export default function EntrarNoGrupo({
  isOpen,
  participanteId,
  grupoId,
  onClose,
  onMembrosChange,
}: Readonly<EntrarNoGrupoProps>) {

  async function handleAdicionarMembro() {
    try {
      await membroService.adicionarMembro(grupoId, participanteId);
      onMembrosChange?.();
      onClose();
    } catch {
      alert("Erro ao salvar grupo");
    }
  }

  return (
    <ConfirmarAcao
      isOpen={isOpen}
      titulo="Entrar no grupo"
      mensagem="Você quer entrar neste grupo?"
      textoConfirmar="Entrar"
      onConfirm={handleAdicionarMembro}
      onClose={onClose}
    />
  );
}