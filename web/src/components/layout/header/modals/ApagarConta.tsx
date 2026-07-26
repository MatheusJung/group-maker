interface ApagarContaProps {
  onClose: () => void;
}

export default function ApagarConta({ onClose }: Readonly<ApagarContaProps>) {
  function handleExcluir() {

    onClose();
  }

  return (
    <>
      <p className="text-sm text-gray-600 mb-4">
        Tem certeza absoluta que deseja apagar sua conta?
      </p>
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded cursor-pointer"
        >
          Cancelar
        </button>
        <button 
          onClick={handleExcluir}
          className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
        >
          Excluir
        </button>
      </div>
    </>
  );
}
