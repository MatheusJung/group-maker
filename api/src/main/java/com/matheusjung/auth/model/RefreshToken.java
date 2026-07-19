package com.matheusjung.auth.model;

import org.hibernate.annotations.CreationTimestamp;

import com.matheusjung.membro.model.Usuario;

import lombok.*;
import jakarta.persistence.*;
import java.time.Instant;
import java.util.UUID;

@Entity
@Table(name = "refresh_tokens")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "uuid")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false, unique = false)
    private Usuario usuario;

    @Column(name = "token", nullable = false, unique = true)
    private UUID token;

    @CreationTimestamp
    @Column(name = "criado_em", nullable = false, updatable = false)
    private Instant criadoEm;

    @Column(name = "expira_em", nullable = false)
    private Instant expiraEm;

    @Builder.Default
    @Column(name = "revogado", nullable = false)
    private Boolean revogado = false;
}
