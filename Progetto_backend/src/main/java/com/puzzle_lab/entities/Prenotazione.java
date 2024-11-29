package com.puzzle_lab.entities;

import java.time.LocalDate;
<<<<<<< Updated upstream
import java.util.List;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
=======
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
>>>>>>> Stashed changes

@Data
@Entity
<<<<<<< Updated upstream
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@DiscriminatorValue("PRENOTAZIONE")
public class Prenotazione extends Richiesta {
	
	private LocalDate dataInizio;
	private LocalDate dataFine;
	
	@ElementCollection
	private List<LocalDate> dateConfermate;
	

=======
@Table(name="prenotazioni")
public class Prenotazione {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(nullable = false)
	private String nome;
	@Column(nullable = false)
	private String cognome;
	@Column(nullable = false)
	private LocalDate dataInizio;
	@Column(nullable = false)
	private LocalDate dataFine;

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

>>>>>>> Stashed changes
}
