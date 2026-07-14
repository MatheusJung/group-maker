import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({
  isOpen,
  title,
  onClose,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between rounded-t bg-primary text-text-primary">
          <h2 className="text-xl p-1 font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="rounded p-1 text-text-primary hover:bg-gray-100 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* Conteúdo */}
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
}
