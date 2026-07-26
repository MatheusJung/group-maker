import { useContext } from "react";
import { ParticipanteAtualContext } from "../contexts/ParticipanteAtualContext";

export function useParticipanteAtual() {
  const contexto = useContext(ParticipanteAtualContext);
  if (!contexto) {
    throw new Error("useParticipanteAtual precisa ser usado dentro de um ParticipanteAtualProvider");
  }
  return contexto;
}