package com.matheusjung.membro.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;
import java.util.UUID;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "usuarios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "uuid")
    private UUID id;

    @Column(name = "nome_usuario", nullable = false, length = 20)
    private String nome;

    @Column(name = "senha", nullable = false, length = 255)
    private String senha;

    @OneToOne(mappedBy = "usuario", fetch = FetchType.LAZY)
    private Membro membro;

    @CreationTimestamp
    @Column(name = "criado_em", nullable = false, updatable = false)
    private Instant criadoEm;

    @UpdateTimestamp
    @Column(name = "atualizado_em", nullable = false)
    private Instant atualizadoEm;
}