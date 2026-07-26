import type { MembroInterface } from "../types/type";
import { api } from "./api";

export const membroService = {

    buscarMembros: async (): Promise<MembroInterface[]> => {
        const response = await api.get<MembroInterface[]>("/membros");
        return response.data;
    },

    async adicionarMembro(grupoId: string, participanteId: string): Promise<MembroInterface[]> {
        const res = await api.post<MembroInterface[]>(`/grupos/${grupoId}/membros`, {
        participanteId
    });
    return res.data;
    },

    async removerMembro(grupoId: string, participanteId: string): Promise<MembroInterface[]> {
        await api.delete(`/grupos/${grupoId}/membros/${participanteId}`);
        const resMembros = await api.get<MembroInterface[]>("/membros");
        return resMembros.data;
    },
}