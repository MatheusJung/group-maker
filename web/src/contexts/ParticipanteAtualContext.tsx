import {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ParticipanteInterface } from "../types/type";
import { api } from "../services/api";

export interface ParticipanteAtualContextValue {
  participanteAtual: ParticipanteInterface | null;
  carregando: boolean;
  erro: string | null;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ParticipanteAtualContext = createContext<
  ParticipanteAtualContextValue | undefined
>(undefined);

export function ParticipanteAtualProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [participanteAtual, setParticipanteAtual] =
    useState<ParticipanteInterface | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const res = await api.get<ParticipanteInterface>("/membros/me");
        if (ignore) return;
        setParticipanteAtual(res.data);
        setErro(null);
      } catch {
        if (!ignore) setErro("Não foi possível identificar seu usuário.");
      } finally {
        if (!ignore) setCarregando(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  const value = useMemo(
    () => ({ participanteAtual, carregando, erro }),
    [participanteAtual, carregando, erro],
  );

  return (
    <ParticipanteAtualContext.Provider value={value}>
      {children}
    </ParticipanteAtualContext.Provider>
  );
}
