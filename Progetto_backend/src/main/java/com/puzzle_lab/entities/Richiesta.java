package com.puzzle_lab.entities;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="richiesta")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE) // Strategia di default
@DiscriminatorColumn(name = "tipo_richiesta", discriminatorType = DiscriminatorType.STRING)
public class Richiesta {
	
	 public enum Status {
	        RICEVUTA,
	        RIFIUTATA,
	        CONFERMATA,
	        PRESA_IN_CARICO
	    }
	
	@Enumerated(EnumType.STRING) // Salva il nome dell'enum come stringa nel database
	@Column(nullable = false)   // Campo obbligatorio
	private Status status = Status.RICEVUTA; 
	 
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String organizzazione;
	private String referente;
	private LocalDate dataCreazione;
	private String testo;

}
