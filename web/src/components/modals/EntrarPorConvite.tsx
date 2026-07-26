import { useActionState } from "react";
import { grupoService } from "../../services/grupoService";

interface EntrarPorConviteProps {
  onClose: () => void;
  onEntrou?: () => void;
}

export default function EntrarPorConvite({
  onClose,
  onEntrou,
}: Readonly<EntrarPorConviteProps>) {
  const [error, formAction, isPending] = useActionState(
    async (_prevState: string | null, formData: FormData) => {
      const codigo = (formData.get("codigoConvite") as string)?.trim();

      if (!codigo) {
        return "Informe o código do convite.";
      }

      try {
        await grupoService.entrarPorConvite(codigo);
        onEntrou?.();
        onClose();
        return null;
      } catch {
        return "Código inválido ou expirado. Tente novamente.";
      }
    },
    null,
  );

  return (
    <>
      {error && (
        <div className="mb-4 rounded bg-red-100 p-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="codigoConvite" className="text-sm font-medium mb-1">
            Código do convite
          </label>
          <input
            type="text"
            id="codigoConvite"
            name="codigoConvite"
            required
            placeholder="Cole ou digite o código"
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
            {isPending ? "Entrando..." : "Entrar"}
          </button>
        </div>
      </form>
    </>
  );
}