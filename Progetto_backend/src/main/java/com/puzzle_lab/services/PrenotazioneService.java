 package com.puzzle_lab.services;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.puzzle_lab.entities.FasciaOraria;
import com.puzzle_lab.entities.Laboratori;
import com.puzzle_lab.entities.Prenotazione;
import com.puzzle_lab.entities.Status;
import com.puzzle_lab.entities.Tipologia;
import com.puzzle_lab.repos.PrenotazioneDAO;

import jakarta.transaction.Transactional;

@Service
public class PrenotazioneService extends RichiestaService{

	 	@Autowired
	    private PrenotazioneDAO prenotazioneDAO;

	 	 // Metodo principale per validare una prenotazione
	    public void validaPrenotazione(Prenotazione prenotazione) {
	        validaRichiesta(prenotazione); // Validazione generale
	        validaDate(prenotazione.getDataInizio(), prenotazione.getDataFine());
	        validaTesto(prenotazione.getTesto());
	        validaCampiOpzionali(prenotazione);
	        validaLaboratori(prenotazione.getLaboratori());
	        validaTipologia(prenotazione.getTipologia());
	    }

	    private void validaTesto(String testo) {
	        if (testo == null || testo.trim().isEmpty()) {
	            throw new IllegalArgumentException("Il testo della prenotazione non può essere vuoto.");
	        }
	        if (testo.length() > 500) {
	            throw new IllegalArgumentException("Il testo della prenotazione non può superare i 500 caratteri.");
	        }
	    }

	    private void validaDate(LocalDate dataInizio, LocalDate dataFine) {
	        if (dataInizio == null || dataFine == null) {
	            throw new IllegalArgumentException("Le date di inizio e fine sono obbligatorie.");
	        }
	        if (dataInizio.isAfter(dataFine)) {
	            throw new IllegalArgumentException("La data di inizio non può essere successiva alla data di fine.");
	        }
	        if (dataInizio.isBefore(LocalDate.now().plusDays(1))) {
	            throw new IllegalArgumentException("La data di inizio deve essere almeno il giorno successivo alla prenotazione.");
	        }
	    }

	    private void validaLaboratori(String laboratori) {
	        if (laboratori == null || laboratori.trim().isEmpty()) {
	            throw new IllegalArgumentException("I laboratori sono obbligatori.");
	        }

	        // Split the string by semicolon and validate each laboratory
	        String[] labs = laboratori.split(",");
	        for (String lab : labs) {
	            String trimmedLab = lab.trim();
	            try {
	                Laboratori.valueOf(trimmedLab);
	            } catch (IllegalArgumentException e) {
	                throw new IllegalArgumentException("Laboratorio non valido: " + trimmedLab);
	            }
	        }
	    }

	    private void validaTipologia(Tipologia tipologia) {
	        if (tipologia == null) {
	            throw new IllegalArgumentException("La tipologia è obbligatoria.");
	        }
	    }

	    private void validaCampiOpzionali(Prenotazione prenotazione) {
	        // Numero giorni obbligatorio se tipologia è SOGGIORNO
	        if (prenotazione.getTipologia() == Tipologia.SOGGIORNO) {
	            validaNumeroGiorni(prenotazione.getNumeroGiorni());
	        }

	        // Fascia oraria obbligatoria se tipologia è MISTO
	        if (prenotazione.getTipologia() == Tipologia.VISITA) {
	            validaFasciaOraria(prenotazione.getFasciaOraria());
	        }
	    }

	    private void validaNumeroGiorni(Integer numeroGiorni) {
	        if (numeroGiorni == null || numeroGiorni <= 0) {
	            throw new IllegalArgumentException("Il numero di giorni è obbligatorio per la tipologia SOGGIORNO e deve essere maggiore di zero.");
	        }
	        if (numeroGiorni > 30) {
	            throw new IllegalArgumentException("Il numero di giorni non può essere maggiore di 30.");
	        }
	    }

	    private void validaFasciaOraria(FasciaOraria fasciaOraria) {
	        if (fasciaOraria == null) {
	            throw new IllegalArgumentException("La fascia oraria è obbligatoria per la tipologia MISTO.");
	        }
	    }

	    // Esegui la validazione di una prenotazione e salvala
	    @Transactional
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
