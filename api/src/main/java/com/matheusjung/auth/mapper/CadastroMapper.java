package com.matheusjung.auth.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import com.matheusjung.auth.dto.request.CadastroRequest;
import com.matheusjung.auth.dto.response.CadastroResponse;
import com.matheusjung.membro.model.Usuario;

@Mapper(componentModel = "spring")
public interface CadastroMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "membro", ignore = true)
    @Mapping(target = "criadoEm", ignore = true)
    @Mapping(target = "atualizadoEm", ignore = true)
    Usuario toEntity(CadastroRequest request);

    @Mapping(target = "usuarioId", ignore = true)
    CadastroResponse toResponse(Usuario membro);
} 