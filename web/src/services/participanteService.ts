import type { ParticipanteInterface } from "../types/type";
import { api } from "./api";

export const participanteService = {

buscarParticipantes: async (): Promise<ParticipanteInterface[]> => {
    const response = await api.get<ParticipanteInterface[]>("/participantes");
    return response.data;
  },
}