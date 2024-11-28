package com.puzzle_lab.entities;

import java.time.LocalDate;
import java.util.List;

import com.puzzle_lab.entities.Richiesta.Status;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="prenotazione")
public class Prenotazione {
	
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
	
    private LocalDate dataInizio;
    private LocalDate dataFine;

    @ElementCollection
    private List<LocalDate> dateConfermate;
}
