import { useState } from "react";

interface CompartilharConviteProps {
  codigoConvite: string | null;
}

export default function CompartilharConvite({
  codigoConvite,
}: Readonly<CompartilharConviteProps>) {
  const [copiado, setCopiado] = useState(false);

  async function handleCopiar() {
    await navigator.clipboard.writeText(codigoConvite!);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  return (
    <div className="p-4 space-y-3">
      <p className="text-sm text-secondary">
        Compartilhe este código com quem você quer convidar:
      </p>

      <div className="flex gap-2">
        <input
          type="text"
          readOnly
          value={codigoConvite!}
          className="flex-1 border rounded p-2 bg-slate-50 text-sm"
        />
        <button
          type="button"
          onClick={handleCopiar}
          className="rounded px-3 py-2 bg-primary-accent text-text-primary hover:bg-primary"
        >
          {copiado ? "Copiado!" : "Copiar"}
        </button>
      </div>
    </div>
  );
}