package com.puzzle_lab.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="richieste")
public class Richiesta {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(nullable = false)
	private String nome;
	@Column(nullable = false)
	private String cognome;
	@Column(nullable = false)
	private String email;
	
	private String numero;
	private String organizzazione;
	private LocalDateTime dataCreazione ;
	private String testo;

	@Enumerated(EnumType.STRING)
	private Status status;

	@PrePersist
    protected void onCreate() {
        this.dataCreazione = LocalDateTime.now();
        this.status = Status.RICEVUTA;
    }

}
