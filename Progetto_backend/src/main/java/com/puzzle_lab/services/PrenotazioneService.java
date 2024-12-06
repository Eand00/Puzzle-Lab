package com.puzzle_lab.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.puzzle_lab.entities.Prenotazione;
import com.puzzle_lab.repos.PrenotazioneDAO;

@Service
public class PrenotazioneService {
	
	 @Autowired
	    private PrenotazioneDAO prenotazioneDAO;

	 // Metodo principale per validare una prenotazione
	    public void validaPrenotazione(Prenotazione prenotazione) {
	        validaNome(prenotazione.getNome());
	        validaCognome(prenotazione.getCognome());
	        validaEmail(prenotazione.getEmail());
	        validaNumero(prenotazione.getNumero());
	        validaDate(prenotazione.getDataInizio(), prenotazione.getDataFine());
	    }

	    // Validazione del nome
	    private void validaNome(String nome) {
	        if (nome == null || nome.trim().isEmpty()) {
	            throw new IllegalArgumentException("Il nome è obbligatorio.");
	        }
	        if (nome.length() < 2) {
	            throw new IllegalArgumentException("Il nome deve contenere almeno 2 caratteri.");
	        }
	    }

	    // Validazione del cognome
	    private void validaCognome(String cognome) {
	        if (cognome == null || cognome.trim().isEmpty()) {
	            throw new IllegalArgumentException("Il cognome è obbligatorio.");
	        }
	        if (cognome.length() < 2) {
	            throw new IllegalArgumentException("Il cognome deve contenere almeno 2 caratteri.");
	        }
	    }

	    // Validazione dell'email (esistenza e formato)
	    private void validaEmail(String email) {
	        if (email == null || email.trim().isEmpty()) {
	            throw new IllegalArgumentException("L'email non può essere vuota.");
	        }

	        // Verifica se l'email esiste già nel sistema
	        if (prenotazioneDAO.existsByEmail(email)) {
	            throw new IllegalArgumentException("L'email è già registrata.");
	        }

	        // Convalida il formato dell'email
	        if (!email.matches("^[\\w.-]+@[\\w.-]+\\.[a-z]{2,}$")) {
	            throw new IllegalArgumentException("Il formato dell'email non è valido.");
	        }
	    }
	    
	    // Validazione del numero di telefono
	    private void validaNumero(String numero) {
	        if (numero != null && !numero.isEmpty()) { // Il numero è opzionale
	            if (!numero.matches("^(\\+\\d{1,3}[- ]?)?\\d{10}$")) {
	                throw new IllegalArgumentException("Il numero di telefono non è valido.");
	            }
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

	    // Esegui la validazione di una prenotazione
	    public void salvaPrenotazione(Prenotazione prenotazione) {
	        validaPrenotazione(prenotazione); // Valida prima di salvare
	        prenotazioneDAO.save(prenotazione);
	    }

	    // Metodo per aggiornare una prenotazione esistente
	    public void updatePrenotazione(long id, Prenotazione prenotazione) {
	        // Verifica se la prenotazione esiste
	        Optional<Prenotazione> existingPrenotazione = prenotazioneDAO.findById(id);
	        if (!existingPrenotazione.isPresent()) {
	            throw new IllegalArgumentException("La prenotazione con ID " + id + " non esiste.");
	        }

	        // Convalida i dati prima di aggiornare
	        validaPrenotazione(prenotazione);

	        // Aggiorna i campi della prenotazione esistente
	        Prenotazione prenotazioneDaAggiornare = existingPrenotazione.get();
	        prenotazioneDaAggiornare.setNome(prenotazione.getNome());
	        prenotazioneDaAggiornare.setCognome(prenotazione.getCognome());
	        prenotazioneDaAggiornare.setEmail(prenotazione.getEmail());
	        prenotazioneDaAggiornare.setDataInizio(prenotazione.getDataInizio());
	        prenotazioneDaAggiornare.setDataFine(prenotazione.getDataFine());
	        prenotazioneDaAggiornare.setTesto(prenotazione.getTesto());
	        prenotazioneDaAggiornare.setOrganizzazione(prenotazione.getOrganizzazione());

	        // Salva la prenotazione aggiornata
	        prenotazioneDAO.save(prenotazioneDaAggiornare);
	    }
	    
	    // Metodo per eliminare una prenotazione
	    public void deletePrenotazione(long id) {
	        // Verifica se la prenotazione esiste
	        Optional<Prenotazione> existingPrenotazione = prenotazioneDAO.findById(id);
	        if (!existingPrenotazione.isPresent()) {
	            throw new IllegalArgumentException("La prenotazione con ID " + id + " non esiste.");
	        }

	        // Elimina la prenotazione dal database
	        prenotazioneDAO.deleteById(id);
	    }

	    // Trova tutte le prenotazioni
	    public List<Prenotazione> findAllPrenotazioni() {
	        return prenotazioneDAO.findAll();
	    }

	    // Trova una prenotazione per ID
	    public Optional<Prenotazione> findPrenotazioneById(long id) {
	        return prenotazioneDAO.findById(id);
	    }
	
	public Optional<Prenotazione> findByEmail(String email){
		
		return prenotazioneDAO.findByEmail(email);
	}
	
}
