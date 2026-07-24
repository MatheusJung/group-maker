package com.matheusjung.auth;

import java.util.UUID;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.matheusjung.auth.dto.AuthTokens;
import com.matheusjung.auth.dto.request.CadastroRequest;
import com.matheusjung.auth.dto.request.LoginRequest;
import com.matheusjung.auth.dto.response.TokenResponse;
import com.matheusjung.auth.dto.response.CadastroResponse;
import com.matheusjung.auth.service.AuthService;
import com.matheusjung.auth.service.RefreshTokenService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;

@Slf4j
@RestController
@RequestMapping("/auth")
@Tag(name = "Auth", description = "Endpoints para Cadastro, Login, Refresh Token e Logout")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final RefreshTokenService refreshTokenService;
    private static final String REFRESH_TOKEN_KEY = "refreshToken";

    @PostMapping("/cadastro")
    @Operation(summary = "Criar um novo cadastro")
    public ResponseEntity<CadastroResponse> cadastrar(           
        @RequestBody @Valid CadastroRequest request){

        CadastroResponse response = authService.cadastrar(request);

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(response);
    }

    @PostMapping("/login")
    @Operation(summary = "Realizar login de usuario")
    public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest request, HttpServletResponse response) {
        
        AuthTokens tokens = authService.login(request);
        
        ResponseCookie springCookie = ResponseCookie.from(REFRESH_TOKEN_KEY, tokens.refreshToken().toString())
            .httpOnly(true)
            .secure(true)    // false para funcionar localmente em HTTP (sem HTTPS)
            .path("/")
            .maxAge(604800)
            .sameSite("None")  // Permite o tráfego seguro entre portas diferentes em localhost [1]
            .build();

        response.addHeader(HttpHeaders.SET_COOKIE, springCookie.toString());

        return ResponseEntity.ok(
            new TokenResponse(
                tokens.accessToken(),
                tokens.usuarioId()
            )
        );
    }

    @PostMapping("/refresh")
    @Operation(summary = "Atualizar refresh token")
    public ResponseEntity<TokenResponse> atualizarToken(
            jakarta.servlet.http.HttpServletRequest request,
            HttpServletResponse response
    ) {
        String refreshTokenStr = null;

        // Captura o cookie sem deixar o Spring MVC quebrar
        if (request.getCookies() != null) {
            for (Cookie c : request.getCookies()) {
                if (REFRESH_TOKEN_KEY.equals(c.getName())) {
                    refreshTokenStr = c.getValue();
                    break;
                }
            }
        }

        if (refreshTokenStr == null || refreshTokenStr.isBlank() || "null".equals(refreshTokenStr)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            UUID tokenUuid = UUID.fromString(refreshTokenStr);
            AuthTokens novoParDeTokens = authService.refresh(tokenUuid);

            // Emite o novo cookie utilizando o builder moderno do Spring
            ResponseCookie springCookie = ResponseCookie.from(REFRESH_TOKEN_KEY, novoParDeTokens.refreshToken().toString())
                    .httpOnly(true)
                    .secure(true) // false:testes locais em HTTP
                    .path("/")     // Escopo global
                    .maxAge(604800)
                    .sameSite("None") // Lax: Permite o tráfego entre portas diferentes em localhost [1]
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE, springCookie.toString());

            return ResponseEntity.ok(new TokenResponse(
                novoParDeTokens.accessToken(),
                novoParDeTokens.usuarioId()
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @Operation(summary = "Realizar logout de usuario")
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
            jakarta.servlet.http.HttpServletRequest request,
            HttpServletResponse response
    ) {
        String refreshTokenStr = null;

        // Leitura segura de cookie no Logout para evitar erros do Spring MVC
        if (request.getCookies() != null) {
            for (Cookie c : request.getCookies()) {
                if (REFRESH_TOKEN_KEY.equals(c.getName())) {
                    refreshTokenStr = c.getValue();
                    break;
                }
            }
        }

        if (refreshTokenStr != null && !refreshTokenStr.isBlank() && !"null".equals(refreshTokenStr)) {
            try {
                UUID tokenUuid = UUID.fromString(refreshTokenStr);
                refreshTokenService.revogar(tokenUuid);
            } catch (Exception e) {
                log.warn("Falha ao processar refresh token: {}", e.getMessage());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        }

        ResponseCookie limpaCookie = ResponseCookie.from(REFRESH_TOKEN_KEY, "")
                .httpOnly(true)
                .secure(true)
                .path("/")
                .maxAge(0) // Diz ao navegador para apagar imediatamente
                .sameSite("None")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, limpaCookie.toString());

        return ResponseEntity.noContent().build();
    }
}
