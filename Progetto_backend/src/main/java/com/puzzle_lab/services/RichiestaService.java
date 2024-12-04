package com.puzzle_lab.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.puzzle_lab.entities.Richiesta;
import com.puzzle_lab.repos.RichiestaDAO;

@Service
public class RichiestaService {
	
	private RichiestaDAO richiestaDAO;

	// Convalida generale per le richieste
    public void validaRichiesta(Richiesta richiesta) {
        validaEmail(richiesta.getEmail());
        validaNome(richiesta.getNome());
        validaCognome(richiesta.getCognome());
        validaTesto(richiesta.getTesto());
    }

    // Validazione dell'email (esistenza e formato)
    private void validaEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("L'email non può essere vuota.");
        }

        // Verifica se l'email esiste già nel sistema
        if (richiestaDAO.existsByEmail(email)) {
            throw new IllegalArgumentException("L'email è già registrata.");
        }

        // Convalida il formato dell'email
        if (!email.matches("^[\\w.-]+@[\\w.-]+\\.[a-z]{2,}$")) {
            throw new IllegalArgumentException("Il formato dell'email non è valido.");
        }
    }

    // Validazione del nome
    private void validaNome(String nome) {
        if (nome == null || nome.trim().isEmpty()) {
            throw new IllegalArgumentException("Il nome non può essere vuoto.");
        }
        if (!nome.matches("^[a-zA-Z\\s]+$")) {
            throw new IllegalArgumentException("Il nome può contenere solo lettere e spazi.");
        }
    }

    // Validazione del cognome
    private void validaCognome(String cognome) {
        if (cognome == null || cognome.trim().isEmpty()) {
            throw new IllegalArgumentException("Il cognome non può essere vuoto.");
        }
        if (!cognome.matches("^[a-zA-Z\\s]+$")) {
            throw new IllegalArgumentException("Il cognome può contenere solo lettere e spazi.");
        }
    }

    // Validazione del testo
    private void validaTesto(String testo) {
        if (testo == null || testo.trim().isEmpty()) {
            throw new IllegalArgumentException("Il testo non può essere vuoto.");
        }
    }

    // Esegui la validazione di una richiesta
    public void salvaRichiesta(Richiesta richiesta) {
        validaRichiesta(richiesta); // Valida prima di salvare
        richiestaDAO.save(richiesta);
    }

    // Metodo per aggiornare una richiesta esistente
    public void updateRichiesta(long id, Richiesta richiesta) {
        // Verifica se la richiesta esiste
        Optional<Richiesta> existingRichiesta = richiestaDAO.findById(id);
        if (!existingRichiesta.isPresent()) {
            throw new IllegalArgumentException("La richiesta con ID " + id + " non esiste.");
        }

        // Convalida i dati prima di aggiornare
        validaRichiesta(richiesta);

        // Aggiorna i campi della richiesta esistente
        Richiesta richiestaDaAggiornare = existingRichiesta.get();
        richiestaDaAggiornare.setNome(richiesta.getNome());
        richiestaDaAggiornare.setCognome(richiesta.getCognome());
        richiestaDaAggiornare.setEmail(richiesta.getEmail());
        richiestaDaAggiornare.setTesto(richiesta.getTesto());
        richiestaDaAggiornare.setOrganizzazione(richiesta.getOrganizzazione());
        richiestaDaAggiornare.setNumero(richiesta.getNumero());

        // Salva la richiesta aggiornata
        richiestaDAO.save(richiestaDaAggiornare);
    }
    
    // Metodo per eliminare una richiesta
    public void deleteRichiesta(long id) {
        // Verifica se la richiesta esiste
        Optional<Richiesta> existingRichiesta = richiestaDAO.findById(id);
        if (!existingRichiesta.isPresent()) {
            throw new IllegalArgumentException("La richiesta con ID " + id + " non esiste.");
        }

        // Elimina la richiesta dal database
        richiestaDAO.deleteById(id);
    }

    // Trova tutte le richieste
    public List<Richiesta> findAllRichieste() {
        return richiestaDAO.findAll();
    }

    // Trova una richiesta per ID
    public Optional<Richiesta> findRichiestaById(long id) {
        return richiestaDAO.findById(id);
    }
    
	public Optional<Richiesta> findByEmail(String email) {
		return richiestaDAO.findByEmail(email);
	}

}
