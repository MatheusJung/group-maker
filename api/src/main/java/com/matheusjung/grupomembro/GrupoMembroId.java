package com.matheusjung.grupomembro;

import java.io.Serializable;
import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GrupoMembroId implements Serializable {
    @Column(name = "grupo_id")
    private UUID grupoId;

    @Column(name = "membro_id")
    private UUID membroId;

}