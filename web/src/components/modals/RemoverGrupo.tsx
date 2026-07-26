import ConfirmarAcao from "./ConfirmarAcao";
import type { GrupoInterface } from "../../types/type";
import { grupoService } from "../../services/grupoService";

interface RemoverGrupoProps {
  grupo: GrupoInterface;
  onClose: () => void;
  onGruposChange?: () => void;
  isOpen: boolean;
}

export default function RemoverGrupo({
  grupo,
  isOpen,
  onGruposChange,
  onClose,
}: Readonly<RemoverGrupoProps>) {

    async function handleRemoverGrupo() {
      try {
        await grupoService.removerGrupo(grupo.id);
        onGruposChange?.();
        onClose();
      } catch {
        alert("Erro ao salvar grupo");
      }
    }
  
  return (
    <ConfirmarAcao
      isOpen={isOpen}
      titulo="Excluir grupo"
      mensagem={
        <>
          Tem certeza que deseja excluir <strong>{grupo.nome}</strong>? Essa
          ação não pode ser desfeita e removerá também todos os subgrupos.
        </>
      }
      textoConfirmar="Excluir"
      variante="perigo"
      onConfirm={() => handleRemoverGrupo()}
      onClose={onClose}
    />
  );
}

