package com.matheusjung.grupomembro;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.matheusjung.grupomembro.dto.response.GrupoMembroResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/grupos-membros")
@Tag(name = "Grupos-Membros", description = "Endpoints para Add e Remover membros de grupos")
@RequiredArgsConstructor
public class GrupoMembroController {

    private final GrupoMembroService service;

    @GetMapping
    public List<GrupoMembroResponse> listar() {
        return service.listar();
    }

    @GetMapping("/{grupoId}/{membroId}")
    public ResponseEntity<GrupoMembroResponse> buscar(
            @PathVariable UUID grupoId,
            @PathVariable UUID membroId) {

            GrupoMembroResponse response = service.buscar(grupoId, membroId);

            return ResponseEntity
            .status(HttpStatus.OK)
            .body(response);
    }

    @PostMapping("/{grupoId}")
    public ResponseEntity<GrupoMembroResponse> entrarNoGrupo(
            @PathVariable UUID grupoId) {

        GrupoMembroResponse response = service.entrarNoGrupo(grupoId);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PostMapping("/{grupoId}/{membroId}")
    public ResponseEntity<GrupoMembroResponse> adicionarMembro(
            @PathVariable UUID grupoId,
            @PathVariable UUID membroId) {

        GrupoMembroResponse response = service.adicionarMembro(grupoId, membroId);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @DeleteMapping("/{grupoId}/{membroId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void removerMembro(
            @PathVariable UUID grupoId,
            @PathVariable UUID membroId) {

        service.removerMembro(grupoId, membroId);
    }

    @DeleteMapping("/{grupoId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void sairMembro(@PathVariable UUID grupoId) {

        service.sairDoGrupo(grupoId);
    }
}