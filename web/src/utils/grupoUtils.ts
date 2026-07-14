// utils/grupoUtils.ts
import type { GrupoInterface, MembroInterface } from "../types/type";

// retorna [grupoId, parentId, parentDoParent, ...] até a raiz
export function getAncestrais(
  grupoId: number,
  todosGrupos: GrupoInterface[],
): number[] {
  const ancestrais: number[] = [];
  let atual = todosGrupos.find((g) => g.id === grupoId);

  while (atual?.parentId != null) {
    ancestrais.push(atual.parentId);
    atual = todosGrupos.find((g) => g.id === atual!.parentId);
  }

  return ancestrais;
}

// retorna todos os ids de grupos descendentes (filhos, netos, ...)
export function getDescendentes(
  grupoId: number,
  todosGrupos: GrupoInterface[],
): number[] {
  const filhosDiretos = todosGrupos.filter((g) => g.parentId === grupoId);
  return filhosDiretos.flatMap((f) => [
    f.id,
    ...getDescendentes(f.id, todosGrupos),
  ]);
}

// adiciona o participante ao grupo E a todos os ancestrais automaticamente
export function adicionarMembro(
  participanteId: number,
  grupoId: number,
  membros: MembroInterface[],
  todosGrupos: GrupoInterface[],
  isAdmin: boolean = false,
): MembroInterface[] {
  const idsNecessarios = [grupoId, ...getAncestrais(grupoId, todosGrupos)];

  const novosMembros = idsNecessarios
    .filter(
      (gid) =>
        !membros.some(
          (m) => m.participanteId === participanteId && m.grupoId === gid,
        ),
    )
    .map((gid) => ({
      participanteId,
      grupoId: gid,
      isAdmin: gid === grupoId ? isAdmin : false,
    }));

  return [...membros, ...novosMembros];
}

// remove do grupo E de todos os descendentes (senão quebraria a regra)
export function removerMembro(
  participanteId: number,
  grupoId: number,
  membros: MembroInterface[],
  todosGrupos: GrupoInterface[],
): MembroInterface[] {
  const idsParaRemover = [grupoId, ...getDescendentes(grupoId, todosGrupos)];

  return membros.filter(
    (m) =>
      !(
        m.participanteId === participanteId &&
        idsParaRemover.includes(m.grupoId)
      ),
  );
}
