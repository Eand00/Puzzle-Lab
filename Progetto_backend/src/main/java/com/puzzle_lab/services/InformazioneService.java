package com.puzzle_lab.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.puzzle_lab.entities.Informazione;
import com.puzzle_lab.repos.InformazioneDAO;

@Service
public class InformazioneService extends RichiestaService {

	@Autowired
	private InformazioneDAO informazioneDAO;

	// Metodo principale per validare un'informazione
	public void validaInformazione(Informazione informazione) {
		validaRichiesta(informazione); // Validazione generale
		validaTesto(informazione.getTesto());
	}

	private void validaTesto(String testo) {
		if (testo == null || testo.trim().isEmpty()) {
			throw new IllegalArgumentException("Il testo dell'informazione non può essere vuoto.");
		}
	}

	// Esegui la validazione di un'informazione
	public void salvaInformazione(Informazione informazione) {
		validaInformazione(informazione); // Valida prima di salvare
		informazioneDAO.save(informazione);
	}

	// Trova tutte le informazioni
	public List<Informazione> trovaTutteInformazioni() {
		return informazioneDAO.findAll();
	}

}
