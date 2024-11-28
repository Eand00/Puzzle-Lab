package com.puzzle_lab.entities;

import java.time.LocalDate;
import java.util.List;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
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
	

}
