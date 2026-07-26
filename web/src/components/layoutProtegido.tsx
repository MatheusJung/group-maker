import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function LayoutProtegido() {
  const { logado, carregando } = useAuth();

  if (carregando) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-500 font-medium animate-pulse">Carregando sessão...</p>
      </div>
    );
  }

  if (!logado) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
