package com.matheusjung.grupomembro;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.matheusjung.grupomembro.dto.request.CriarGrupoMembroRequest;
import com.matheusjung.grupomembro.dto.response.GrupoMembroResponse;

@Mapper(componentModel = "spring")
public interface GrupoMembroMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "grupo", ignore = true)
    @Mapping(target = "membro", ignore = true)
    @Mapping(target = "admin", ignore = true)
    @Mapping(target = "criadoEm", ignore = true)
    @Mapping(target = "atualizadoEm", ignore = true)
    GrupoMembro toEntity(CriarGrupoMembroRequest request);

    @Mapping(target = "grupoId", source = "grupo.id")
    @Mapping(target = "membroId", source = "membro.id")
    @Mapping(target = "isAdmin", source = "admin")
    GrupoMembroResponse toResponse(GrupoMembro membro);
} 