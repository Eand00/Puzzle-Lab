 package com.puzzle_lab.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.puzzle_lab.entities.Prenotazione;
import com.puzzle_lab.entities.Status;
import com.puzzle_lab.repos.PrenotazioneDAO;

@Service
public class PrenotazioneService extends RichiestaService{

	 	@Autowired
	    private PrenotazioneDAO prenotazioneDAO;

	 // Metodo principale per validare una prenotazione
	    public void validaPrenotazione(Prenotazione prenotazione) {
	        validaRichiesta(prenotazione); // Validazione generale
	        validaDate(prenotazione.getDataInizio(), prenotazione.getDataFine());
	        validaTesto(prenotazione.getTesto());
	    }

	    private void validaTesto(String testo) {
			if (testo == null || testo.trim().isEmpty()) {
				throw new IllegalArgumentException("Il testo della prenotazione non può essere vuoto.");
			}
	    }

		private void validaDate(LocalDateTime localDateTime, LocalDateTime localDateTime2) {
	        if (localDateTime == null || localDateTime2 == null) {
	            throw new IllegalArgumentException("Le date di inizio e fine sono obbligatorie.");
	        }
	        if (localDateTime.isAfter(localDateTime2)) {
	            throw new IllegalArgumentException("La data di inizio non può essere successiva alla data di fine.");
	        }
	        if (localDateTime.isBefore(LocalDateTime.now().plusDays(1))) {
	            throw new IllegalArgumentException("La data di inizio deve essere almeno il giorno successivo alla prenotazione.");
	        }
	    }

	    // Esegui la validazione di una prenotazione
	    public void salvaPrenotazione(Prenotazione prenotazione) {
	        validaPrenotazione(prenotazione); // Valida prima di salvare
	        prenotazioneDAO.save(prenotazione);
	    }

	    // Trova tutte le prenotazioni
	    public List<Prenotazione> trovaTuttePrenotazioni() {
	        return prenotazioneDAO.findAll();
	    }
	    // Trova le prenotazioni NON archiviate
	    public List<Prenotazione> trovaPrenotazioni() {
	        return prenotazioneDAO.findByStatusNot(Status.ARCHIVIATA);
	    }
	    // Trova solo le prenotazioni archiviate
	    public List<Prenotazione> trovaPrenotazioniArchiviate() {
	        return prenotazioneDAO.findByStatus(Status.ARCHIVIATA);
	    }
}
