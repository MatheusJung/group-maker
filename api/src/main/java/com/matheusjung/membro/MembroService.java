package com.matheusjung.membro;

import java.util.List;
import java.util.UUID;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.matheusjung.auth.exception.AuthException;
import com.matheusjung.membro.dto.request.AtualizarMembroRequest;
import com.matheusjung.membro.dto.response.MembroResponse;
import com.matheusjung.membro.exception.MembroException;
import com.matheusjung.membro.model.Membro;
import com.matheusjung.membro.model.Usuario;
import com.matheusjung.membro.repository.MembroRepository;
import com.matheusjung.membro.repository.UsuarioRepository;
import com.matheusjung.shared.storage.ImageStorageService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class MembroService {

    private static final String IMAGE_BUCKET = "usuarios_image";
    private static final String IMAGE_FOLDER = "usuarios";

    private final MembroRepository membroRepository;
    private final MembroMapper mapper;
    private final ImageStorageService imageStorageService;
    private final UsuarioRepository usuarioRepository;

    @Transactional
    public void cadastrarFoto(MultipartFile foto) {

        Membro membro = getMembroLogado();

        if (foto != null && !foto.isEmpty()) {

            String fotoUrl = imageStorageService.upload(
                    IMAGE_BUCKET,
                    IMAGE_FOLDER,
                    membro.getId(), 
                    foto
            );

            membro.setFotoUrl(fotoUrl);
            membroRepository.save(membro);
        }
    }

    // UPDATE
    @Transactional
    public MembroResponse atualizarPerfil(AtualizarMembroRequest request) {

        Membro membro = getMembroLogado();

        membro.setNome(request.nome());

        return mapper.toResponse(
                membroRepository.save(membro)
        );
    }

    public void deletarFoto() {

        Membro membro = getMembroLogado();

        imageStorageService.delete(
                IMAGE_BUCKET,
                IMAGE_FOLDER,
                membro.getId(),
                membro.getFotoUrl()
        );

        membro.setFotoUrl(null);
        membroRepository.save(membro);
    }

    // DELETE
    public void deletarConta() {

        Usuario usuario = getUsuarioLogado();
        Membro membro = usuario.getMembro();

        imageStorageService.delete(
                IMAGE_BUCKET,
                IMAGE_FOLDER,
                membro.getId(),
                membro.getFotoUrl()
        );

        usuarioRepository.delete(usuario);
    }

    // READ ALL
    @Transactional(readOnly = true)
    public List<MembroResponse> listar() {

        return membroRepository.findAll()
                .stream()
                .map(mapper::toResponse)
                .toList();
    }

    // READ BY ID
    @Transactional(readOnly = true)
    public MembroResponse buscarPorId(UUID id) {

        Membro membro = buscarMembro(id);
        return mapper.toResponse(membro);
    }

    private Usuario getUsuarioLogado() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated()) {
            throw AuthException.naoAutenticado();
        }

        if (!(authentication.getPrincipal() instanceof UUID usuarioId)) {
            throw AuthException.naoAutenticado();
        }

        return usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário logado não encontrado no banco de dados."));
    }

    public Membro getMembroLogado() {
        Usuario usuario = getUsuarioLogado();
        
        if (usuario.getMembro() == null) {
            throw MembroException.semVinculo();
        }

        return membroRepository.findById(usuario.getMembro().getId())
              .orElseThrow(MembroException::naoEncontrado);
    }

    public MembroResponse buscarMeuMembro(UUID usuarioId) {
        Membro membro = buscarMembroPorUsuarioId(usuarioId);

        return mapper.toResponse(membro);
    }

    // Métodos auxiliares
    public Membro buscarMembro(UUID id) {
        return membroRepository.findById(id)
                .orElseThrow(MembroException::naoEncontrado);
    }

    public Usuario buscarUsuario(UUID id) {
        return usuarioRepository.findById(id)
                .orElseThrow(MembroException::naoEncontrado);
    }

    public Usuario buscarUsuarioPorNome(String nome) {
        return usuarioRepository.findByNome(nome)
                .orElseThrow(MembroException::naoEncontrado);
    }

    public Membro buscarMembroPorUsuarioId(UUID usuarioId) {
        return membroRepository.findByUsuarioId(usuarioId)
              .orElseThrow(MembroException::naoEncontrado);
    }
}