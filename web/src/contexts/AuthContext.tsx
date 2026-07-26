import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useRef,
} from "react";
import {
  setMemoriaAccessToken,
  executarAutoRefreshGlobal,
} from "../services/api";

export interface Usuario {
  usuarioId: string;
}

export interface AuthContextType {
  logado: boolean;
  usuario: Usuario | null;
  carregando: boolean;
  loginContexto: (dadosUsuario: Usuario) => void;
  logoutContexto: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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

        console.log("SUCESSO NO REFRESH");

        const { accessToken, usuarioId } = response.data;

        setMemoriaAccessToken(accessToken);
        setUsuario({ usuarioId });
        setLogado(true);
      } catch {
        console.error("ERRO NO REFRESH");

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

  const valorContexto = useMemo(
    () => ({
      logado,
      usuario,
      carregando,
      loginContexto,
      logoutContexto,
    }),
    [logado, usuario, carregando],
  );

  return (
    <AuthContext.Provider value={valorContexto}>
      {children}
    </AuthContext.Provider>
  );
}