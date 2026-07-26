import { useState, type ChangeEvent, useActionState } from "react";
import type { CriarGrupoRequest } from "../../types/dto";
import fotoPlaceholder from "../../assets/participante.png";
import { grupoService } from "../../services/grupoService";

interface AdicionarGrupoProps {
  grupoPaiId: string | null;
  onClose: () => void;
  onGrupoCriado?: () => void;
}

export default function AdicionarGrupo({
  grupoPaiId,
  onClose,
  onGrupoCriado,
}: Readonly<AdicionarGrupoProps>) {
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);

  const [error, formAction, isPending] = useActionState(
    async (_prevState: string | null, formData: FormData) => {
      const nome = formData.get("nomeGrupo") as string;
      const descricao = formData.get("descGrupo") as string;
      const maxMembros = Number(formData.get("numMembros"));
      const imagemArquivo = formData.get("fotoGrupo") as File | null;

      if (maxMembros < 2) {
        return "O grupo deve permitir pelo menos 2 participantes.";
      }

      const dto: CriarGrupoRequest = {
        nome: nome,
        descricao: descricao || undefined,
        maxMembros,
        grupoPaiId,
      };

      try {
        const arquivoValido =
          imagemArquivo && imagemArquivo.size > 0 ? imagemArquivo : null;
        await grupoService.adicionarGrupo(dto, arquivoValido);
        onGrupoCriado?.();
        onClose();
        return null;
      } catch {
        return "Ocorreu um erro ao salvar o grupo no servidor. Tente novamente.";
      }
    },
    null,
  );

  function handleImagem(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (fotoPreview) URL.revokeObjectURL(fotoPreview);
      const imageUrl = URL.createObjectURL(file);
      setFotoPreview(imageUrl);
    }
  }

  return (
    <>
      {error && (
        <div className="mb-4 rounded bg-red-100 p-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <form action={formAction} className="flex gap-2">
        <div className="flex items-center justify-center">
          <label className="flex h-32 w-32 shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-slate-300 text-slate-400 transition hover:border-sky-400 hover:text-sky-500 overflow-hidden">
            {fotoPreview ? (
              <img
                src={fotoPreview}
                alt="Preview Local"
                className="h-28 w-28 object-cover"
              />
            ) : (
              <>
                <img
                  src={fotoPlaceholder}
                  alt="placeholder"
                  className="h-20 w-20 object-cover opacity-50"
                />
                <span className="text-xs font-medium">Foto do Grupo</span>
              </>
            )}

            <input
              type="file"
              name="fotoGrupo"
              accept="image/*"
              onChange={handleImagem}
              className="hidden"
            />
          </label>
        </div>
        <div>
          <div className="flex gap-1">
            <div className="flex flex-col w-40">
              <label htmlFor="nomeGrupo" className="text-sm font-medium mb-1">
                Nome do grupo
              </label>
              <input
                type="text"
                id="nomeGrupo"
                name="nomeGrupo"
                required
                className="border rounded p-0.5 focus:outline-sky-500"
              />
            </div>

            <div className="flex flex-col w-25">
              <label htmlFor="numMembros" className="text-sm font-medium mb-1">
                Max. Membros
              </label>
              <input
                type="number"
                id="numMembros"
                name="numMembros"
                defaultValue={2}
                min={2}
                required
                className="border rounded p-0.5 focus:outline-sky-500"
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="descGrupo" className="text-sm font-medium mb-1">
              Descrição do grupo
            </label>
            <input
              id="descGrupo"
              name="descGrupo"
              className="border rounded p-0.5 focus:outline-sky-500"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="rounded px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded px-4 py-2 bg-primary-accent text-white hover:bg-primary disabled:opacity-50 flex items-center justify-center"
            >
              {isPending ? "Enviando para o servidor..." : "Salvar Grupo"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
