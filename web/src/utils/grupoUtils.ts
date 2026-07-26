import type { GrupoInterface, MembroInterface } from "../types/type";

export function getAncestrais(
  grupoId: string,
  todosGrupos: GrupoInterface[],
): string[] {
  const ancestrais: string[] = [];
  let atual = todosGrupos.find((g) => g.id === grupoId);

  while (atual?.grupoPaiId != null) {
    ancestrais.push(atual.grupoPaiId);
    atual = todosGrupos.find((g) => g.id === atual!.grupoPaiId);
  }

  return ancestrais;
}

export function getDescendentes(
  grupoId: string,
  todosGrupos: GrupoInterface[],
): string[] {
  const filhosDiretos = todosGrupos.filter((g) => g.grupoPaiId === grupoId);
  return filhosDiretos.flatMap((f) => [
    f.id,
    ...getDescendentes(f.id, todosGrupos),
  ]);
}

export function isMembroDoGrupo(
  participanteId: string,
  grupoId: string,
  membros: MembroInterface[],
): boolean {
  return membros.some(
    (m) => m.participanteId === participanteId && m.grupoId === grupoId,
  );
}

export function isAdminDoGrupo(
  participanteId: string,
  grupoId: string,
  membros: MembroInterface[],
): boolean {
  return membros.some(
    (m) =>
      m.participanteId === participanteId && m.grupoId === grupoId && m.isAdmin,
  );
}
