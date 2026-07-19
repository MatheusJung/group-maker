import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function LayoutProtegido() {
  // Puxa os estados reais de autenticação e carregamento do sistema
  const { logado, carregando } = useAuth();

  // Segura a tela, enquanto estiver carregando
  if (carregando) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-500 font-medium animate-pulse">Carregando sessão...</p>
      </div>
    );
  }

  // Se o carregamento terminou e o usuário NÃO está autenticado, barra o acesso
  if (!logado) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver logado, renderiza a página interna (/home) com sucesso
  return <Outlet />;
}
