import React, { createContext, useContext, useState, useEffect, useMemo, useRef } from 'react';
import { setMemoriaAccessToken, executarAutoRefreshGlobal } from '../services/api';

interface Usuario {
  nome: string;
  nomeUsuario: string;
  fotoUrl?: string;
}

interface AuthContextType {
  logado: boolean;
  usuario: Usuario | null;
  carregando: boolean;
  loginContexto: (dadosUsuario: Usuario) => void;
  logoutContexto: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [logado, setLogado] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const efeitoExecutado = useRef(false);

  useEffect(() => {
    if (efeitoExecutado.current) return;
    efeitoExecutado.current = true;

    const recuperarSessao = async () => {
      try {
        const response = await executarAutoRefreshGlobal();
        
        console.log("SUCESSO NO REFRESH", response.data); // 🔥 Adicione este log temporário
        
        const { accessToken, nome, nomeUsuario, fotoUrl } = response.data;
        
        setMemoriaAccessToken(accessToken);
        setUsuario({ nome, nomeUsuario, fotoUrl });
        setLogado(true);
         } catch (error: any) {
        // 🔥 LOG 2: Ver qual foi o erro que fez o React te expulsar para o Login
        console.error("ERRO NO REFRESH (REACT):", error.response?.status, error.response?.data);
        
        setLogado(false);
        setUsuario(null);
      } finally {
        setCarregando(false);
      }
    };

    recuperarSessao();
  }, []);

  const loginContexto = (dadosUsuario: Usuario) => {
    setUsuario(dadosUsuario);
    setLogado(true);
  };

  const logoutContexto = () => {
    setUsuario(null);
    setLogado(false);
  };

  const valorContexto = useMemo(() => ({
    logado,
    usuario,
    carregando,
    loginContexto,
    logoutContexto
  }), [logado, usuario, carregando]);

  return (
    <AuthContext.Provider value={valorContexto}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
