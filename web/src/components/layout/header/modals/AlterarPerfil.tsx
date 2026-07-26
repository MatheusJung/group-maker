interface AlterarPerfilProps {
  onClose: () => void;
}

export default function AlterarPerfil({ onClose }: Readonly<AlterarPerfilProps>) {
  function handleAtualizar() {
    onClose();
  }

  return (
    <>
      <p className="text-sm text-gray-500 mb-4">
        Modifique os seus dados cadastrais.
      </p>
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded cursor-pointer"
        >
          Cancelar
        </button>
        <button 
          onClick={handleAtualizar}
          className="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary-accent"
        >
          Atualizar
        </button>
      </div>
    </>
  );
}
