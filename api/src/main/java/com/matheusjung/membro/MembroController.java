package com.matheusjung.membro;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.matheusjung.membro.dto.request.AtualizarMembroRequest;
import com.matheusjung.membro.dto.response.MembroResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/membros")
@Tag(name = "Membros", description = "Endpoints para Consultar, Editar e Listar membros")
@RequiredArgsConstructor
public class MembroController {

    private final MembroService service;

    @GetMapping
    @Operation(summary = "Listar membros")
    public List<MembroResponse> findAll() {
        return service.listar();
    }

    @GetMapping("/{id}")
    @Operation(summary = "Consultar membro")
    public MembroResponse findById(@PathVariable UUID id) {
        return service.buscarPorId(id);
    }

    @PutMapping(value = "/atualizaPerfil")
    @Operation(summary = "Atualiza os dados textuais do perfil do usuário logado")
    public ResponseEntity<MembroResponse> atualizarPerfil(
        @RequestBody @Valid AtualizarMembroRequest request) {

        MembroResponse response = service.atualizarPerfil(request);

        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "/cadastroFoto", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Fazer upload de uma foto de cadastro")
    public ResponseEntity<Void> criar(           
        @RequestParam(value = "foto") MultipartFile foto) {

        service.cadastrarFoto(foto);

        return ResponseEntity
        .status(HttpStatus.CREATED)
        .build(); 
    }

    @DeleteMapping(value = "/deleteFoto")
    @Operation(summary = "Apagar a foto de cadastro")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletarFoto() {

        service.deletarFoto();
    }

    @DeleteMapping("/deleteConta")
    @Operation(summary = "Apagar a conta de cadastro")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete() {
        service.deletarConta();
    }
}