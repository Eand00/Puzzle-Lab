package com.puzzle_lab.entities;

import java.time.LocalDateTime;

import org.hibernate.annotations.SQLRestriction;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;

@JsonTypeInfo(
	    use = JsonTypeInfo.Id.NAME,
	    include = JsonTypeInfo.As.PROPERTY,
	    property = "tipo"
	)
	@JsonSubTypes({
	    @JsonSubTypes.Type(value = Informazione.class, name = "informazione"),
	    @JsonSubTypes.Type(value = Prenotazione.class, name = "prenotazione")
	})
@Data
@Entity
@SQLRestriction("cancellato = false")
@Table(name="richieste")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Richiesta {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String nome;
	@Column(nullable = false)
	private String cognome;
	@Column(nullable = false)
	private String email;
    @Column(nullable = false)
	private String organizzazione;
	private String numero;
	private LocalDateTime dataCreazione ;
	private boolean cancellato = false;
    private LocalDateTime dataPrevistaCancellazione;

	@Enumerated(EnumType.STRING)
	private Status status;

	@PrePersist
    protected void onCreate() {
        this.dataCreazione = LocalDateTime.now();
        this.status = Status.RICEVUTA;
    }

}
