package com.matheusjung.grupo;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.matheusjung.grupo.dto.request.AtualizarGrupoRequest;
import com.matheusjung.grupo.dto.request.CriarGrupoRequest;
import com.matheusjung.grupo.dto.response.GrupoResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/grupos")
@Tag(name = "Grupos", description = "Endpoints para criar, editar e excluir grupos")
@RequiredArgsConstructor
public class GrupoController {

    private final GrupoService service;

    @GetMapping
    @Operation(summary = "Listar Grupos")
    public List<GrupoResponse> findAll() {
        return service.listar();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Consultar Grupo")
    public GrupoResponse findById(@PathVariable UUID id) {
        return service.buscarPorId(id);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Criar Grupo")
    public ResponseEntity<GrupoResponse> criarGrupo(@Valid CriarGrupoRequest request) {

    GrupoResponse response = service.criarGrupo(request);

    return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(response);
    }

    @PostMapping(value = "/foto/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Cadastrar foto do Grupo")
    public ResponseEntity<GrupoResponse> cadastrarFoto(
            @PathVariable UUID id,
            @RequestParam(value = "foto") MultipartFile foto
    ) {

        GrupoResponse response = service.cadastrarFoto(id, foto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PutMapping(
        value = "/{id}",
        consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    @Operation(summary = "Atualizar Grupo")
    public ResponseEntity<GrupoResponse> atualizarGrupo(
            @PathVariable UUID id,@Valid AtualizarGrupoRequest request) {

        GrupoResponse response = service.atualizarGrupo(id, request);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/foto/{id}")
    @Operation(summary = "Apagar foto do Grupo")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFoto(@PathVariable UUID id) {
        service.deleteFoto(id);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Apagar Grupo")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteGrupo(@PathVariable UUID id) {
        service.deleteGrupo(id);
    }
}