import { useState, type ReactNode } from "react";

interface ConfirmarAcaoProps {
  isOpen: boolean;
  titulo: string;
  mensagem: ReactNode;
  textoConfirmar?: string;
  textoCancelar?: string;
  variante?: "padrao" | "perigo";
  onConfirm: () => Promise<void>;
  onClose: () => void;
}

export default function ConfirmarAcao({
  isOpen,
  titulo,
  mensagem,
  textoConfirmar = "Confirmar",
  textoCancelar = "Cancelar",
  variante = "padrao",
  onConfirm,
  onClose,
}: Readonly<ConfirmarAcaoProps>) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleConfirmar() {
    setError(null);
    setIsPending(true);
    try {
      await onConfirm();
      onClose();
    } catch {
      setError("Ocorreu um erro. Tente novamente.");
    } finally {
      setIsPending(false);
    }
  }

  if (!isOpen) return null;

  const corBotaoConfirmar =
    variante === "perigo"
      ? "bg-red-600 text-white hover:bg-red-700"
      : "bg-primary-accent text-text-primary hover:bg-primary";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (isPending) return;
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && !isPending) onClose();
      }}
    >
      <div
        className="w-full max-w-md rounded bg-white shadow-xl p-4 space-y-3"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold">{titulo}</h2>
        <div className="text-sm text-text-primary">{mensagem}</div>

        {error && (
          <div className="rounded bg-red-100 p-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="rounded px-4 py-2 border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            {textoCancelar}
          </button>
          <button
            type="button"
            onClick={handleConfirmar}
            disabled={isPending}
            className={`rounded px-4 py-2 disabled:opacity-50 ${corBotaoConfirmar}`}
          >
            {isPending ? "Enviando..." : textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}