import { membroService } from "../../services/membroService";
import ConfirmarAcao from "./ConfirmarAcao";

interface SairDoGrupoProps {
  isOpen: boolean;
  participanteId: string;
  grupoId: string;
  onClose: () => void;
  onMembrosChange?: () => void;
}

export default function SairDoGrupo({
  isOpen,
  participanteId,
  grupoId,
  onClose,
  onMembrosChange
}: Readonly<SairDoGrupoProps>) {

  async function handleRemoverMembro() {
    try {
      await membroService.removerMembro(grupoId, participanteId);
      onMembrosChange?.();
      onClose();
    } catch {
      alert("Erro ao salvar grupo");
    }
  }

  return (
    <ConfirmarAcao
      isOpen={isOpen}
      titulo="Sair do grupo"
      mensagem="Tem certeza que deseja sair deste grupo? Você também sairá de todos os subgrupos dele."
      textoConfirmar="Sair"
      variante="perigo"
      onConfirm={handleRemoverMembro}
      onClose={onClose}
    />
  );
}