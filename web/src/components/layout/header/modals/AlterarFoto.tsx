interface AlterarFotoProps {
  onClose: () => void;
}

export default function AlterarFoto({ onClose }: Readonly<AlterarFotoProps>) {
  function handleSalvar() {

    onClose();
  }

  return (
    <>
      <p className="text-sm text-gray-500 mb-4">
        Selecione um novo arquivo de imagem.
      </p>
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded cursor-pointer"
        >
          Cancelar
        </button>
        <button 
          onClick={handleSalvar}
          className="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary-accent"
        >
          Salvar
        </button>
      </div>
    </>
  );
}
