import ConfirmarAcao from "./ConfirmarAcao";
import type { ParticipanteInterface } from "../../types/type";

interface RemoverMembroProps {
  isOpen: boolean;
  participante: ParticipanteInterface;
  grupoId: string;
  onSave: (participanteId: string, grupoId: string) => Promise<void>;
  onClose: () => void;
}

export default function RemoverMembro({
  isOpen,
  participante,
  grupoId,
  onSave,
  onClose,
}: Readonly<RemoverMembroProps>) {
  return (
    <ConfirmarAcao
      isOpen={isOpen}
      titulo="Remover participante"
      mensagem={
        <>
          Remover <strong>{participante.nome}</strong> deste grupo? Ele também
          será removido de todos os subgrupos.
        </>
      }
      textoConfirmar="Remover"
      variante="perigo"
      onConfirm={() => onSave(participante.id, grupoId)}
      onClose={onClose}
    />
  );
}