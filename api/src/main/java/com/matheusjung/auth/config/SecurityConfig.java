package com.matheusjung.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import com.matheusjung.auth.service.JwtService;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtService jwtService;

    @Bean
    @SuppressWarnings("java:S4502")
    public SecurityFilterChain securityFilterChain(HttpSecurity http) { 

        try {
            http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                    // Libera as requisições de teste OPTIONS do navegador
                    .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                    .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
                    .requestMatchers("/auth/cadastro", "/auth/login", "/auth/refresh", "/auth/logout").permitAll() 
                    .anyRequest().authenticated()           
                )

                //Injeta o JwtFilter depois de configurar o CORS
                .addFilterBefore(new JwtFilter(jwtService), UsernamePasswordAuthenticationFilter.class);

            return http.build();
        } catch (Exception e) {
            throw new IllegalStateException("Erro ao configurar a segurança da aplicação", e);
        }
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        // Permite estritamente a URL do seu servidor React/Vite
        configuration.setAllowedOrigins(List.of("http://localhost:5173")); 
        
        // Métodos HTTP aceitos
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        // Cabeçalhos que o React pode enviar
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept"));
        
        // Permite que o Spring receba e envie o cookie "refreshToken"
        configuration.setAllowCredentials(true); 

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}
