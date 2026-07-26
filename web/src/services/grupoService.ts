import type { AtualizarGrupoRequest, CriarGrupoRequest } from "../types/dto";
import type {
  GrupoInterface,
  MembroInterface,
  ParticipanteInterface,
} from "../types/type";
import { api } from "./api";

export const grupoService = {
  async carregarDadosIniciais() {
    const [resGrupos, resParticipantes, resMembros] = await Promise.all([
      api.get<GrupoInterface[]>("/grupos"),
      api.get<ParticipanteInterface[]>("/membros"),
      api.get<MembroInterface[]>("/grupos-membros"),
    ]);

    return {
      grupos: resGrupos.data,
      participantes: resParticipantes.data,
      membros: resMembros.data,
    };
  },

  buscarGrupos: async (): Promise<GrupoInterface[]> => {
    const response = await api.get<GrupoInterface[]>("/grupos");
    return response.data;
  },

  async adicionarGrupo(
    dto: CriarGrupoRequest,
    imagemArquivo: File | null,
  ): Promise<GrupoInterface> {
    const res = await api.post<GrupoInterface>("/grupos", {
      nome: dto.nome,
      descricao: dto.descricao,
      grupoPaiId: dto.grupoPaiId,
    });
    let grupoCriado = res.data;

    if (imagemArquivo) {
      try {
        grupoCriado = await this.atualizarFotoGrupo(
          grupoCriado.id,
          imagemArquivo,
        );
      } catch (err) {
        console.error(`Falha ao salvar foto do grupo ${grupoCriado.id}:`, err);
      }
    }

    return grupoCriado;
  },

  async editarGrupo(
    dto: AtualizarGrupoRequest,
    imagemArquivo: File | null,
  ): Promise<GrupoInterface> {
    const res = await api.put<GrupoInterface>(`/grupos/${dto.id}`, {
      nome: dto.nome,
      descricao: dto.descricao,
    });
    let grupoAtualizado = res.data;

    if (imagemArquivo) {
      try {
        grupoAtualizado = await this.atualizarFotoGrupo(dto.id, imagemArquivo);
      } catch (err) {
        console.error(`Falha ao salvar foto do grupo ${dto.id}:`, err);
      }
    }

    return grupoAtualizado;
  },

  async atualizarFotoGrupo(
    grupoId: string,
    foto: File,
  ): Promise<GrupoInterface> {
    const payload = new FormData();
    payload.append("foto", foto);

    const res = await api.post<GrupoInterface>(
      `/grupos/foto/${grupoId}`,
      payload,
    );
    return res.data;
  },

  async removerGrupo(grupoId: string): Promise<void> {
    await api.delete(`/grupos/${grupoId}`);
  },

  async obterConvite(grupoId: string): Promise<string> {
    const res = await api.get<{ codigo: string }>(`/grupos/${grupoId}/convite`);
    return res.data.codigo;
  },

  async entrarPorConvite(codigo: string) {
    const resMembros = await api.post<MembroInterface[]>(
      `/convites/${codigo}/entrar`,
    );
    const resGrupos = await api.get<GrupoInterface[]>("/grupos");

    return {
      membros: resMembros.data,
      grupos: resGrupos.data,
    };
  },
};
