import { useState } from "react";
import type { MembroInterface} from "../../types/type";
import ConfirmarAcao from "./ConfirmarAcao";
import fotoPadrao from "../../assets/participante.png";
import { membroService } from "../../services/membroService";

interface AdicionarMembroProps {
  isOpen: boolean;
  grupoId: string;
  candidatos: MembroInterface[];
  onClose: () => void;
  onChange?: () => void;
}

export default function AdicionarMembro({
  grupoId,
  candidatos,
  onClose,
  onChange
}: Readonly<AdicionarMembroProps>) {
  const [selecionado, setSelecionado] = useState<MembroInterface | null>(null);

  async function handleAdicionarMembro(participanteId:string) {
    try {
      await membroService.adicionarMembro(grupoId, participanteId);
      onChange?.();
      onClose();
    } catch {
      alert("Erro ao salvar grupo");
    }
  }

  return (
    <>
      <div className="p-4">
        {candidatos.length === 0 ? (
          <p className="text-sm text-secondary">
            Nenhum participante do grupo pai disponível para adicionar.
          </p>
        ) : (
          <ul className="flex flex-col gap-1 max-h-80 overflow-y-auto">
            {candidatos.map((p) => (
              <li key={p.participanteId}>
                <button
                  type="button"
                  onClick={() => setSelecionado(p)}
                  className="w-full flex items-center gap-2 p-2 rounded hover:bg-primary-light transition-colors"
                >
                  <img
                    src={p.fotoMembro || fotoPadrao}
                    alt=""
                    className="h-8 w-8 rounded bg-white"
                  />
                  <span className="text-sm">{p.nomeMembro}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selecionado && (
        <ConfirmarAcao
          isOpen={selecionado !== null}
          titulo="Confirmar adição"
          mensagem={
            <>
              Adicionar <strong>{selecionado.nomeMembro}</strong> a este grupo?
            </>
          }
          textoConfirmar="Adicionar"
          onConfirm={() =>
            handleAdicionarMembro(selecionado.participanteId)
          }
          onClose={() => setSelecionado(null)}
        />
      )}
    </>
  );
}