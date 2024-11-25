package com.puzzle_lab.entities;

import java.time.LocalDate;
import java.util.List;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;

@Entity
@DiscriminatorValue("PRENOTAZIONE")
public class Prenotazione extends Richiesta {
	
	private LocalDate dataInizio;
	private LocalDate dataFine;
	
	@ElementCollection
	private List<LocalDate> dateConfermate;
	
	 public Prenotazione() {
	        super();
	    }

	    public Prenotazione(
	        String organizzazione, 
	        String referente, 
	        LocalDate dataCreazione, 
	        String testo,
	        Status status,
	        LocalDate dataInizio, 
	        LocalDate dataFine, 
	        List<LocalDate> dateConfermate) {
	        super(); 
	        this.setOrganizzazione(organizzazione);
	        this.setReferente(referente);
	        this.setDataCreazione(dataCreazione);
	        this.setTesto(testo);
	        this.setStatus(status);
	        this.dataInizio = dataInizio;
	        this.dataFine = dataFine;
	        this.dateConfermate = dateConfermate;
	    }
	
	public LocalDate getDataInizio() {
		return dataInizio;
	}
	public void setDataInizio(LocalDate dataInizio) {
		this.dataInizio = dataInizio;
	}
	public LocalDate getDataFine() {
		return dataFine;
	}
	public void setDataFine(LocalDate dataFine) {
		this.dataFine = dataFine;
	}
	public List<LocalDate> getDateConfermate() {
		return dateConfermate;
	}
	public void setDateConfermate(List<LocalDate> dateConfermate) {
		this.dateConfermate = dateConfermate;
	}

}
