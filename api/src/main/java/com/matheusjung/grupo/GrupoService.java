package com.matheusjung.grupo;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.matheusjung.grupo.dto.request.AtualizarGrupoRequest;
import com.matheusjung.grupo.dto.request.CriarGrupoRequest;
import com.matheusjung.grupo.dto.response.GrupoResponse;
import com.matheusjung.grupomembro.GrupoMembroService;
import com.matheusjung.membro.MembroService;
import com.matheusjung.membro.model.Membro;
import com.matheusjung.shared.storage.ImageStorageService;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class GrupoService {

    private static final String IMAGE_BUCKET = "grupos_image";
    private static final String IMAGE_FOLDER = "grupos";

    private final GrupoRepository repository;
    private final GrupoMapper mapper;
    private final ImageStorageService imageStorageService;
    private final MembroService membroService;
    private final GrupoMembroService grupoMembroService;

    // Criar Grupo
    @Transactional
    public GrupoResponse criarGrupo(CriarGrupoRequest request) {

        Grupo grupo = mapper.toEntity(request);

        if (request.grupoPaiId() != null) {
            Grupo grupoPai = repository.findById(request.grupoPaiId())
                .orElseThrow(() -> new EntityNotFoundException("Grupo pai não encontrado"));
            grupo.setGrupoPai(grupoPai);
        }

        repository.save(grupo);
        grupoMembroService.criadorComoAdmin(grupo);

        return mapper.toResponse(grupo);
    }

     // Cadastrar Foto
    @Transactional
    public GrupoResponse cadastrarFoto(
            UUID id,
            MultipartFile foto
    ) {

        Grupo grupo = buscarGrupo(id);

        if (foto != null && !foto.isEmpty()) {

            String fotoUrl = imageStorageService.upload(
                    IMAGE_BUCKET,
                    IMAGE_FOLDER,
                    grupo.getId(),
                    foto
            );

            grupo.setFotoUrl(fotoUrl);
            grupo = repository.save(grupo);
        }

        return mapper.toResponse(grupo);
    }

    // UPDATE
    @Transactional
    public GrupoResponse atualizarGrupo(
            UUID id,
            AtualizarGrupoRequest request
    ) {

        Grupo grupo = buscarGrupo(id);
        grupo.setNome(request.nome());
        grupo.setDescricao(request.descricao());

        return mapper.toResponse(
                repository.save(grupo)
        );
    }

    // DELETE
    public void deleteGrupo(UUID id) {
        Grupo grupo = buscarGrupo(id);
        repository.delete(grupo);
    }

    // DELETE
    public void deleteFoto(UUID id) {
        Grupo grupo = buscarGrupo(id);
             imageStorageService.delete(
                IMAGE_BUCKET,
                IMAGE_FOLDER,
                grupo.getId(),
                grupo.getFotoUrl()
        );

        grupo.setFotoUrl(null);
        repository.save(grupo);
    }

        // READ ALL
    @Transactional(readOnly = true)
    public List<GrupoResponse> listar() {
        return repository.findAll()
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    // READ BY ID
    @Transactional(readOnly = true)
    public GrupoResponse buscarPorId(UUID id) {
        Grupo grupo = buscarGrupo(id);
        return mapper.toResponse(grupo);
    }

    @Transactional(readOnly = true)
    public List<GrupoResponse> listarSubgruposDoPai(UUID grupoPaiId) {
        Membro membroLogado = membroService.getMembroLogado();

        boolean pertenceAoGrupoPai = grupoMembroService.verificarSeMembroPertenceAoGrupoPai(grupoPaiId, membroLogado.getId());

        if (!pertenceAoGrupoPai) {
            return Collections.emptyList(); 
        }

        List<Grupo> subgrupos = repository.findByGrupoPaiId(grupoPaiId);

        return subgrupos.stream()
                .map(mapper::toResponse)
                .toList();
    }

    // Método auxiliar
   public Grupo buscarGrupo(UUID id) {
        return repository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Grupo " + id + " não encontrado."));
    }
}