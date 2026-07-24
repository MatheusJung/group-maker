package com.matheusjung.auth.service;

import java.util.UUID;

import com.matheusjung.auth.dto.AuthTokens;
import com.matheusjung.auth.dto.request.*;
import com.matheusjung.auth.dto.response.*;
import com.matheusjung.auth.exception.LoginException;
import com.matheusjung.auth.mapper.CadastroMapper;
import com.matheusjung.auth.model.RefreshToken;
import com.matheusjung.membro.MembroService;
import com.matheusjung.membro.model.Membro;
import com.matheusjung.membro.model.Usuario;
import com.matheusjung.membro.repository.MembroRepository;
import com.matheusjung.membro.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService{

    private final MembroService membroService;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final PasswordEncoder passwordEncoder;
    private final CadastroMapper cadastroMapper;

    private final UsuarioRepository usuarioRepository;
    private final MembroRepository membroRepository;

    @Transactional
    public CadastroResponse cadastrar(CadastroRequest request) {

        Usuario usuario = new Usuario();
        usuario.setNome(request.nomeUsuario());
        usuario.setSenha(passwordEncoder.encode(request.senha()));
        usuario = usuarioRepository.save(usuario);

        Membro membro = new Membro();
        membro.setNome(request.nome());
        membro.setUsuario(usuario);

        membro = membroRepository.save(membro);

        usuario.setMembro(membro);
        usuario = usuarioRepository.save(usuario); 

        return cadastroMapper.toResponse(usuario);
    }

    @Transactional
    public AuthTokens login(LoginRequest request) {

        Usuario usuario = membroService.buscarUsuarioPorNome(request.nome());

        if (!passwordEncoder.matches(request.senha(), usuario.getSenha())) {
            throw LoginException.invalida();
        }

        String accessToken = jwtService.gerar(usuario.getNome(), usuario.getId());
        RefreshToken refreshToken = refreshTokenService.gerar(usuario);

        return new AuthTokens(
                accessToken,
                refreshToken.getId(),
                usuario.getId()
        );
    }

    @Transactional
    public AuthTokens refresh(UUID tokenVindoDoCookie) {

        RefreshToken refreshToken = refreshTokenService.atualizar(tokenVindoDoCookie);
        Usuario usuario = refreshToken.getUsuario();
        String accessToken = jwtService.gerar(usuario.getNome(), usuario.getId());

        return new AuthTokens(
                accessToken,
                usuario.getId(),
                refreshToken.getId()
        );
    }

    @Transactional
    public void logout(LogoutRequest request) {
        refreshTokenService.revogar(request.refreshToken());
    }
}