package com.puzzle_lab.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.puzzle_lab.entities.Richiesta;
import com.puzzle_lab.entities.Status;
import com.puzzle_lab.repos.RichiestaDAO;

@Service
public class RichiestaService {

	@Autowired
	private RichiestaDAO richiestaDAO;

	// Convalida generale per le richieste
    protected void validaRichiesta(Richiesta richiesta) {
        validaEmail(richiesta.getEmail());
        validaNomeCognome(richiesta.getNome());
        validaNomeCognome(richiesta.getCognome());
        validaNumero(richiesta.getNumero());

    }

    private void validaNumero(String numero) {
		if (numero == null || numero.trim().isEmpty()) {
			throw new IllegalArgumentException("Il numero non può essere vuoto.");
		}
		if (!numero.matches("^\\+?(?:[0-9] ?){6,14}[0-9]$")) {
			throw new IllegalArgumentException("Il numero può contenere solo cifre.");
		}

	}

	// Validazione dell'email (esistenza e formato)
    private void validaEmail(String email) {
        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("L'email non può essere vuota.");
        }

        // Convalida il formato dell'email
        if (!email.matches("^[\\w.-]+@[\\w.-]+\\.[a-z]{2,}$")) {
            throw new IllegalArgumentException("Il formato dell'email non è valido.");
        }
    }

    // Validazione del nome
    private void validaNomeCognome(String nome) {
        if (nome == null || nome.trim().isEmpty()) {
            throw new IllegalArgumentException("Il nome/cognome non può essere vuoto.");
        }
        if (!nome.matches("^[a-zA-Z\\s]+$")) {
            throw new IllegalArgumentException("Il nome/cognome può contenere solo lettere e spazi.");
        }
    }

    // Trova tutte le richieste
    public List<Richiesta> trovaTutte() {
        return richiestaDAO.findAll();
    }

    // Trova una richiesta per ID
    public Optional<Richiesta> trovaPerId(long id) {
        return richiestaDAO.findById(id);
    }
    
    //ricerche testuali tutte case sensitive
    public List<Richiesta> trovaPerNome(String nome) {
    	List<Richiesta> richieste = richiestaDAO.findAll();
    	List<Richiesta> elenco = new ArrayList<Richiesta>();
    	for (Richiesta richiesta : richieste) {
			if(richiesta.getNome().contains(nome))
				elenco.add(richiesta);
		}
    	return elenco;
    }
    
    public List<Richiesta> trovaPerCognome(String cognome) {
    	List<Richiesta> richieste = richiestaDAO.findAll();
    	List<Richiesta> elenco = new ArrayList<Richiesta>();
    	for (Richiesta richiesta : richieste) {
			if(richiesta.getCognome().contains(cognome))
				elenco.add(richiesta);
		}
    	return elenco;
    }
    
    public List<Richiesta> trovaPerEmail(String email) {
    	List<Richiesta> richieste = richiestaDAO.findAll();
    	List<Richiesta> elenco = new ArrayList<Richiesta>();
    	for (Richiesta richiesta : richieste) {
			if(richiesta.getEmail().contains(email))
				elenco.add(richiesta);
		}
    	return elenco;
    }
    
    public List<Richiesta> trovaPerOrganizzazione(String organizzazione) {
    	List<Richiesta> richieste = richiestaDAO.findAll();
    	List<Richiesta> elenco = new ArrayList<Richiesta>();
    	for (Richiesta richiesta : richieste) {
			if(richiesta.getOrganizzazione().contains(organizzazione))
				elenco.add(richiesta);
		}
    	return elenco;
    }
    
    public Optional<Richiesta> trovaPerData(LocalDateTime data) {
		return richiestaDAO.findByDataCreazione(data);
	}
	
	public Optional<Richiesta> trovaPerStatus(String status) {
		return richiestaDAO.findByStatus(Status.valueOf(status));
	}

}
