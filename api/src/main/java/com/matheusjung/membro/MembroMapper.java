package com.matheusjung.membro;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.matheusjung.membro.dto.response.MembroResponse;
import com.matheusjung.membro.model.Membro;

@Mapper(componentModel = "spring")
public interface MembroMapper {

    @Mapping(target = "usuarioId", source = "usuario.id")
    MembroResponse toResponse(Membro membro);
} 