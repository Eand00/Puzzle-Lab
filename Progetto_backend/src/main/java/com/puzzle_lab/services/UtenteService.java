package com.puzzle_lab.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.puzzle_lab.entities.Utente;
import com.puzzle_lab.repos.UtenteDAO;

@Service
public class UtenteService {

    @Autowired
	private UtenteDAO utenteDAO;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
	public List<Utente> findAll(){

		return utenteDAO.findAll();
	}

	public Optional<Utente> findByEmail(String email){

		return utenteDAO.findById(email);
	}

	// Salva un utente nel database
    public Utente salvaUtente(Utente utente) {
        //validaUtente(utente); // Effettua la convalida
    	utente.setPassword(passwordEncoder.encode(utente.getPassword()));
        return utenteDAO.save(utente); // Salva nel database
    }

    // Aggiorna un utente esistente
    public Utente aggiornaUtente(Utente utente) {
        if (!utenteDAO.existsById(utente.getEmail())) {
            throw new IllegalArgumentException("Utente con email " + utente.getEmail() + " non trovato.");
        }
        validaUtente(utente); // Effettua la convalida
        return utenteDAO.save(utente); // Salva aggiornato
    }

    // Elimina un utente per email
    public void eliminaUtente(String email) {
        if (!utenteDAO.existsById(email)) {
            throw new IllegalArgumentException("Utente con email " + email + " non esiste.");
        }
        utenteDAO.deleteById(email);
    }

    // Validazione dei dati dell'utente
    public void validaUtente(Utente utente) {
        validaEmail(utente.getEmail());
        validaRuolo(utente.getRuolo());
        validaNome(utente.getNome());
        validaCognome(utente.getCognome());
    }

    // Convalida dell'email
    private void validaEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("L'email non può essere vuota.");
        }

        // Verifica se l'email esiste già nel sistema
        if (utenteDAO.existsById(email)) {
            throw new IllegalArgumentException("L'email è già registrata.");
        }

        // Convalida il formato dell'email
        if (!email.matches("^[\\w.-]+@[\\w.-]+\\.[a-z]{2,}$")) {
            throw new IllegalArgumentException("Il formato dell'email non è valido.");
        }
    }

    // Validazione del ruolo
    private void validaRuolo(String ruolo) {
        if (ruolo == null || ruolo.trim().isEmpty()) {
            throw new IllegalArgumentException("Il ruolo non può essere vuoto.");
        }
        if (!ruolo.matches("^(ADMIN|USER)$")) {
            throw new IllegalArgumentException("Il ruolo deve essere uno tra: ADMIN, USER.");
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
}
