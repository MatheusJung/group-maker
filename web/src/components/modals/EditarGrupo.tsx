import { useState, type ChangeEvent, useActionState } from "react";
import type { GrupoInterface } from "../../types/type";
import type { AtualizarGrupoRequest } from "../../types/dto";
import fotoPlaceholder from "../../assets/participante.png";
import { grupoService } from "../../services/grupoService";

interface EditarGrupoProps {
  grupo: GrupoInterface;
  onClose: () => void;
  onGrupoAtualizado?: () => void;
}

export default function EditarGrupo({
  grupo,
  onClose,
  onGrupoAtualizado,
}: Readonly<EditarGrupoProps>) {
  const [fotoPreview, setFotoPreview] = useState<string | null>(grupo.fotoUrl || null);

  const [error, formAction, isPending] = useActionState(
    async (_prevState: string | null, formData: FormData) => {
      const nome = formData.get("nomeGrupo") as string;
      const descricao = formData.get("descGrupo") as string;
      const maxMembros = Number(formData.get("numMembros"));
      const imagemArquivo = formData.get("fotoGrupo") as File | null;

      if (maxMembros < 2) {
        return "O grupo deve permitir pelo menos 2 participantes.";
      }

      const dto: AtualizarGrupoRequest = {
        id: grupo.id,
        nome: nome || grupo.nome,
        descricao: descricao || undefined,
        maxMembros,
      };

      try {
        const arquivoValido = imagemArquivo && imagemArquivo.size > 0 ? imagemArquivo : null;
        await grupoService.editarGrupo(dto, arquivoValido);
        onGrupoAtualizado?.();
        onClose();
        return null;
      } catch {
        return "Ocorreu um erro ao salvar as alterações. Tente novamente.";
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

      <form action={formAction} className="space-y-4">
        <div className="flex flex-col items-center justify-center">
          <label className="flex h-32 w-32 shrink-0 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-slate-300 text-slate-400 transition hover:border-sky-400 hover:text-sky-500 overflow-hidden">
            <img
              src={fotoPreview || fotoPlaceholder}
              alt="Preview"
              className={`h-full w-full object-cover ${!fotoPreview ? "opacity-50" : ""}`}
            />
            <input
              type="file"
              name="fotoGrupo"
              accept="image/*"
              onChange={handleImagem}
              className="hidden"
            />
          </label>
        </div>

        <div className="flex flex-col">
          <label htmlFor="nomeGrupo" className="text-sm font-medium mb-1">
            Nome do grupo
          </label>
          <input
            type="text"
            id="nomeGrupo"
            name="nomeGrupo"
            defaultValue={grupo.nome}
            required
            className="border rounded p-2 focus:outline-sky-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="descGrupo" className="text-sm font-medium mb-1">
            Descrição do grupo
          </label>
          <textarea
            id="descGrupo"
            name="descGrupo"
            defaultValue={grupo.descricao}
            rows={3}
            className="border rounded p-2 focus:outline-sky-500 resize-none"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="numMembros" className="text-sm font-medium mb-1">
            Máximo de membros
          </label>
          <input
            type="number"
            id="numMembros"
            name="numMembros"
            defaultValue={grupo.maxMembros ?? 2}
            min={2}
            required
            className="border rounded p-2 focus:outline-sky-500"
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
            className="rounded px-4 py-2 bg-sky-500 text-white hover:bg-sky-600 disabled:opacity-50"
          >
            {isPending ? "Salvando..." : "Salvar Alterações"}
          </button>
        </div>
      </form>
    </>
  );
}