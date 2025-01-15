package com.puzzle_lab.services;

import java.time.LocalDateTime;
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
        if (!nome.matches("^[a-zA-ZÀ-ù'\\s]+$")) {
            throw new IllegalArgumentException("Il nome/cognome può contenere solo lettere e spazi.");
        }
    }

    // Trova tutte le richieste
    public List<Richiesta> trovaTutte() {
        return richiestaDAO.findAll();
    }
    // Trova le richieste NON archiviate
    public List<Richiesta> trovaRichieste() {
        return richiestaDAO.findByStatusNot(Status.ARCHIVIATA);
    }
    // Trova solo le richieste archiviate
    public List<Richiesta> trovaRichiesteArchiviate() {
        return richiestaDAO.findByStatus(Status.ARCHIVIATA);
    }

    // Trova una richiesta per ID
    public Optional<Richiesta> trovaPerId(long id) {
        return richiestaDAO.findById(id);
    }


    public Optional<List<Richiesta>> trovaPerNome(String nome) {
        return richiestaDAO.findByNome(nome);
    }
    public Optional<List<Richiesta>> trovaPerCognome(String cognome) {
        return richiestaDAO.findByCognome(cognome);
    }
    public Optional<List<Richiesta>> trovaPerEmail(String email) {
        return richiestaDAO.findByEmail(email);
    }
    public Optional<List<Richiesta>> trovaPerOrganizzazione(String organizzazione) {
        return richiestaDAO.findByOrganizzazione(organizzazione);
    }

    public Optional<Richiesta> trovaPerData(LocalDateTime data) {
		return richiestaDAO.findByDataCreazione(data);
	}

	public List<Richiesta> trovaPerStatus(String status) {
		return richiestaDAO.findByStatus(Status.valueOf(status));
	}

	public void cancellaPerId(long id) {
		if (!richiestaDAO.existsById(id)) {
			throw new IllegalArgumentException("La richiesta non esiste.");
		}
		Richiesta richiesta = richiestaDAO.findById(id).get();
		richiesta.setCancellato(true);
		richiesta.setDataPrevistaCancellazione(LocalDateTime.now().plusYears(1));
		richiestaDAO.save(richiesta);
	}

	public Richiesta save(Richiesta richiesta) {
		return richiestaDAO.save(richiesta);
	}
}
