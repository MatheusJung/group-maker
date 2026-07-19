package com.matheusjung.grupomembro;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.matheusjung.grupo.Grupo;
import com.matheusjung.membro.model.Membro;

@Entity
@Table(name = "grupos_membros")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GrupoMembro {

    @EmbeddedId
    private GrupoMembroId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("grupoId")
    @JoinColumn(name = "grupo_id")
    private Grupo grupo;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("membroId")
    @JoinColumn(name = "membro_id")
    private Membro membro;

    @Column(name = "is_admin")
    private Boolean admin;

    @CreationTimestamp
    @Column(name = "criado_em", updatable = false)
    private Instant criadoEm;

    @UpdateTimestamp
    @Column(name = "atualizado_em")
    private Instant atualizadoEm;
}
