package com.matheusjung.grupo;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.matheusjung.grupo.dto.request.CriarGrupoRequest;
import com.matheusjung.grupo.dto.response.GrupoResponse;

@Mapper(componentModel = "spring")
public interface GrupoMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "fotoUrl", ignore = true)
    @Mapping(target = "grupoPai", ignore = true)
    @Mapping(target = "subgrupos", ignore = true)
    @Mapping(target = "criadoEm", ignore = true)
    @Mapping(target = "atualizadoEm", ignore = true)
    Grupo toEntity(CriarGrupoRequest request);


    @Mapping(target = "grupoPaiId", source = "grupoPai.id")
    GrupoResponse toResponse(Grupo grupo);
} 