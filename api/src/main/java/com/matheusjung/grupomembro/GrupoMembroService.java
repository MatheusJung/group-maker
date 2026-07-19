package com.matheusjung.grupomembro;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.matheusjung.auth.exception.AuthException;
import com.matheusjung.grupo.Grupo;
import com.matheusjung.grupo.GrupoRepository;
import com.matheusjung.grupomembro.dto.response.GrupoMembroResponse;
import com.matheusjung.grupomembro.exception.GrupoMembroException;
import com.matheusjung.membro.MembroService;
import com.matheusjung.membro.model.Membro;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class GrupoMembroService {

    private final GrupoMembroRepository repository;
    private final GrupoMembroMapper mapper;
    private final MembroService membroService;
    private final GrupoRepository grupoRepository; 

    // ADICIONAR CRIADOR COMO ADMIN
    @Transactional
    public GrupoMembroResponse criadorComoAdmin(Grupo grupo) {

        Membro membro = membroService.getMembroLogado();
        GrupoMembro grupoMembro = new GrupoMembro();
        grupoMembro.setId(new GrupoMembroId(grupo.getId(), membro.getId()));
        grupoMembro.setGrupo(grupo);
        grupoMembro.setMembro(membro);
        grupoMembro.setAdmin(true);
        
        repository.save(grupoMembro);

        return mapper.toResponse(grupoMembro);
    }


    // ADICIONAR MEMBRO AO GRUPO
    @Transactional
    public GrupoMembroResponse adicionarMembro(UUID grupoId, UUID membroId) {

        verificarSeMembroLogadoEhAdmin(grupoId);
        verificarSeMembroPertenceAoGrupo(grupoId, membroId);

        Membro membro = membroService.buscarMembro(membroId);
        Grupo grupo = buscarGrupoPorId(grupoId);
        GrupoMembro grupoMembro = new GrupoMembro();
        grupoMembro.setId(new GrupoMembroId(grupoId, membroId));
        grupoMembro.setGrupo(grupo);
        grupoMembro.setMembro(membro);
        grupoMembro.setAdmin(false);

        repository.save(grupoMembro);

        return mapper.toResponse(grupoMembro);
    }

    //MEMBRO ENTRA NO GRUPO
    @Transactional
    public GrupoMembroResponse entrarNoGrupo(UUID grupoId) {

        Membro membro = membroService.getMembroLogado();
        
        Grupo grupo = buscarGrupoPorId(grupoId);
        GrupoMembro grupoMembro = new GrupoMembro();
        grupoMembro.setId(new GrupoMembroId(grupoId, membro.getId()));
        grupoMembro.setGrupo(grupo);
        grupoMembro.setMembro(membro);
        grupoMembro.setAdmin(false);

        repository.save(grupoMembro);

        return mapper.toResponse(grupoMembro);
    }

    // REMOVER MEMBRO DO GRUPO
    @Transactional
    public void removerMembro(UUID grupoId, UUID membroId) {

        verificarSeMembroLogadoEhAdmin(grupoId);

        GrupoMembroId id = new GrupoMembroId(grupoId, membroId);
        GrupoMembro grupoMembro = repository.findById(id)
                        .orElseThrow(GrupoMembroException::naoPertenceAoGrupo);

        repository.delete(grupoMembro);
    }

    //MEMBRO SAIR DO GRUPO
    @Transactional
    public void sairDoGrupo(UUID grupoId) {

        Membro membro = membroService.getMembroLogado();
        GrupoMembroId id = new GrupoMembroId(grupoId, membro.getId());
        GrupoMembro grupoMembro = repository.findById(id)
                        .orElseThrow(GrupoMembroException::naoPertenceAoGrupo);

        repository.delete(grupoMembro);
    }

        // LISTAR TODOS
    @Transactional(readOnly = true)
    public List<GrupoMembroResponse> listar() {

        return repository.findAll()
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    // LISTAR MEMBROS DE UM GRUPO
    @Transactional(readOnly = true)
    public List<GrupoMembroResponse> listarPorGrupo(UUID grupoId) {

        return repository.findByGrupoId(grupoId)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    // LISTAR GRUPOS DE UM MEMBRO
    @Transactional(readOnly = true)
    public List<GrupoMembroResponse> listarPorMembro(UUID membroId) {

        return repository.findByMembroId(membroId)
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    // BUSCAR RELAÇÃO
    @Transactional(readOnly = true)
    public GrupoMembroResponse buscar(UUID grupoId, UUID membroId) {

        GrupoMembroId id = new GrupoMembroId(grupoId, membroId);

        return mapper.toResponse(
                repository.findById(id)
                        .orElseThrow(GrupoMembroException::naoPertenceAoGrupo));
    }

    //METODOS AUXILIARES

    private Grupo buscarGrupoPorId(UUID grupoId) {
        return grupoRepository.findById(grupoId)
            .orElseThrow(GrupoMembroException::naoPertenceAoGrupo);
    }

    private void verificarSeMembroLogadoEhAdmin(UUID grupoId) {
        
        Membro membroLogado = membroService.getMembroLogado();
        GrupoMembroId id = new GrupoMembroId(grupoId, membroLogado.getId());
        GrupoMembro vinculo = repository.findById(id)
                .orElseThrow(AuthException::acessoNegado);

        if (!Boolean.TRUE.equals(vinculo.getAdmin())) { 
                throw AuthException.acessoNegado();
        }
    }

    public void verificarSeMembroPertenceAoGrupo(UUID grupoId, UUID membroId) {
        GrupoMembroId id = new GrupoMembroId(grupoId, membroId);
        
        if (repository.existsById(id)) {
            throw GrupoMembroException.jaPertenceAoGrupo();
        }
    }

    public boolean verificarSeMembroPertenceAoGrupoPai(UUID grupoId, UUID membroId) {
    Grupo grupoFilho = buscarGrupoPorId(grupoId);
    
    if (grupoFilho.getGrupoPai() == null) { 
        return false;
    }
    
    UUID grupoPaiId = grupoFilho.getGrupoPai().getId();
    GrupoMembroId idChavePai = new GrupoMembroId(grupoPaiId, membroId);
    
    return repository.existsById(idChavePai);
    }
}