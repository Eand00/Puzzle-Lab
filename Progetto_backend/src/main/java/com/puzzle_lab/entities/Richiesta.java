package com.puzzle_lab.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorColumn;
import jakarta.persistence.DiscriminatorType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
<<<<<<< Updated upstream
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
=======
import jakarta.persistence.PrePersist;
>>>>>>> Stashed changes
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
<<<<<<< Updated upstream
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
	 
=======
@Table(name="richieste")
public class Richiesta {

>>>>>>> Stashed changes
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(nullable = false)
	private String nome;
	@Column(nullable = false)
	private String cognome;

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
