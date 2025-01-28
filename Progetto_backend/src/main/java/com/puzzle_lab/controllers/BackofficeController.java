package com.puzzle_lab.controllers;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.puzzle_lab.entities.Informazione;
import com.puzzle_lab.entities.Prenotazione;
import com.puzzle_lab.entities.Richiesta;
import com.puzzle_lab.entities.Status;
import com.puzzle_lab.entities.Utente;
import com.puzzle_lab.services.InformazioneService;
import com.puzzle_lab.services.PrenotazioneService;
import com.puzzle_lab.services.RichiestaService;
import com.puzzle_lab.services.UtenteService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;


@RestController
@RequestMapping("/back-office")
public class BackofficeController {

	@Autowired
    private InformazioneService informazioneService;

    @Autowired
    private PrenotazioneService prenotazioneService;

    @Autowired
    private RichiestaService richiestaService;

    @Autowired
    private UtenteService utenteService;
    
    @Operation(summary = "Ottieni richiesta per ID", description = "Recupera una richiesta utilizzando il suo ID univoco")
    @ApiResponse(responseCode = "200", description = "Richiesta recuperata con successo")
    @ApiResponse(responseCode = "404", description = "Richiesta non trovata")
    @ApiResponse(responseCode = "500", description = "Errore interno del server")
    @GetMapping("/richieste/{id}")
    public ResponseEntity<Richiesta> ottieniRichiestaPerId(@PathVariable Long id) {
        try {
            Optional<Richiesta> richiesta = richiestaService.trovaPerId(id);
            if (richiesta.isPresent()) {
                return ResponseEntity.ok(richiesta.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "Ottieni le richieste", description = "Recupera tutte le richieste non archiviate")
    @ApiResponse(responseCode = "200", description = "Lista di richieste recuperata con successo")
    @ApiResponse(responseCode = "500", description = "Errore interno del server")
    @GetMapping("/richieste")
    public ResponseEntity<List<Richiesta>> ottieniTutteRichiesteNonArchiviate() {
        try {
            List<Richiesta> richieste = richiestaService.trovaRichieste();
            return ResponseEntity.ok(richieste);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "Ottieni tutte le richieste", description = "Recupera tutte le richieste")
    @ApiResponse(responseCode = "200", description = "Lista di richieste recuperata con successo")
    @ApiResponse(responseCode = "500", description = "Errore interno del server")
    @GetMapping("/richieste/tutte")
    public ResponseEntity<List<Richiesta>> ottieniTutteRichieste() {
        try {
            List<Richiesta> richieste = richiestaService.trovaTutte();
            return ResponseEntity.ok(richieste);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "Ottieni le richieste archiviate", description = "Recupera tutte le richieste archiviate")
    @ApiResponse(responseCode = "200", description = "Lista di richieste recuperata con successo")
    @ApiResponse(responseCode = "500", description = "Errore interno del server")
    @GetMapping("/richieste/archivio")
    public ResponseEntity<List<Richiesta>> ottieniRichiesteArchiviate() {
        try {
            List<Richiesta> richieste = richiestaService.trovaRichiesteArchiviate();
            return ResponseEntity.ok(richieste);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "Ottieni le richieste con status x", description = "Recupera tutte le richieste con un determinato status")
    @ApiResponse(responseCode = "200", description = "Lista di richieste recuperata con successo")
    @ApiResponse(responseCode = "500", description = "Errore interno del server")
    @GetMapping("/richieste/status")
    public ResponseEntity<List<Richiesta>> ottieniRichiestePerStatus(@RequestParam(required = false) String status) {
        try {
            List<Richiesta> richieste = richiestaService.trovaPerStatus(status);
            return ResponseEntity.ok(richieste);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "Ottieni le richieste con nome x", description = "Recupera tutte le richieste che contengono il parametro nel campo nome")
    @ApiResponse(responseCode = "200", description = "Lista di richieste recuperata con successo")
    @ApiResponse(responseCode = "500", description = "Errore interno del server")
    @GetMapping("/richieste/nome")
    public ResponseEntity<Optional<List<Richiesta>>> ottieniRichiestePerNome(@RequestParam(required = false) String nome) {
        try {
            Optional<List<Richiesta>> richieste = richiestaService.trovaPerNome(nome);
            return ResponseEntity.ok(richieste);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "Ottieni le richieste con cognome x", description = "Recupera tutte le richieste che contengono il parametro nel campo cognome")
    @ApiResponse(responseCode = "200", description = "Lista di richieste recuperata con successo")
    @ApiResponse(responseCode = "500", description = "Errore interno del server")
    @GetMapping("/richieste/cognome")
    public ResponseEntity<Optional<List<Richiesta>>> ottieniRichiestePerCognome(@RequestParam(required = false) String cognome) {
        try {
            Optional<List<Richiesta>> richieste = richiestaService.trovaPerCognome(cognome);
            return ResponseEntity.ok(richieste);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "Ottieni le richieste con email x", description = "Recupera tutte le richieste che contengono il parametro nel campo email")
    @ApiResponse(responseCode = "200", description = "Lista di richieste recuperata con successo")
    @ApiResponse(responseCode = "500", description = "Errore interno del server")
    @GetMapping("/richieste/email")
    public ResponseEntity<Optional<List<Richiesta>>> ottieniRichiestePerEmail(@RequestParam(required = false) String email) {
        try {
            Optional<List<Richiesta>> richieste = richiestaService.trovaPerEmail(email);
            return ResponseEntity.ok(richieste);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "Ottieni le richieste con organizzazione x", description = "Recupera tutte le richieste che contengono il parametro nel campo organizzazione")
    @ApiResponse(responseCode = "200", description = "Lista di richieste recuperata con successo")
    @ApiResponse(responseCode = "500", description = "Errore interno del server")
    @GetMapping("/richieste/organizzazione")
    public ResponseEntity<Optional<List<Richiesta>>> ottieniRichiestePerOrganizzazione(@RequestParam(required = false) String organizzazione) {
        try {
            Optional<List<Richiesta>> richieste = richiestaService.trovaPerOrganizzazione(organizzazione);
            return ResponseEntity.ok(richieste);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "Ottieni le richieste con data x", description = "Recupera tutte le richieste che hanno una certa data di creazione")
    @ApiResponse(responseCode = "200", description = "Lista di richieste recuperata con successo")
    @ApiResponse(responseCode = "500", description = "Errore interno del server")
    @GetMapping("/richieste/data")//formato data: 2025-01-04T21:30:27
    public ResponseEntity<Optional<Richiesta>> ottieniRichiestePerData(@RequestParam(required = false) LocalDate data) {
        try {
            Optional<Richiesta> richieste = richiestaService.trovaPerData(data);
            return ResponseEntity.ok(richieste);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @Operation(summary = "Update stato", description = "Modifica lo stato di una richiesta")
    @ApiResponse(responseCode = "200", description = "Stato aggiornato")
    @ApiResponse(responseCode = "500", description = "Errore interno del server")
    @PutMapping("/richieste/status")
    public ResponseEntity<Optional<Richiesta>> modificaStatusRichiesta(@RequestParam Long id, @RequestParam Status status) {
        try {
            Optional<Richiesta> richiesta = richiestaService.trovaPerId(id);
            if (richiesta.isPresent()) {
            	Richiesta richiestaAggiornata = richiesta.get();
            	richiestaAggiornata.setStatus(status);
            	richiestaService.salvaRichiesta(richiestaAggiornata);
            }
            return ResponseEntity.ok(richiesta);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "Elimita richiesta", description = "Modifica il flag cancellato di una richiesta rendendolo invisibile e imposta la data di cancellazione a un anno dalla data attuale")
    @ApiResponse(responseCode = "201", description = "Richiesta cancellato con successo")
    @ApiResponse(responseCode = "400", description = "Richiesta non valida")
    @DeleteMapping("/richieste")
    public ResponseEntity<String> eliminaRichiesta(@RequestBody Long id) {
        try {
            richiestaService.cancellaPerId(id);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Utente cancellato con successo.");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @Operation(summary = "Ottieni le informazioni", description = "Recupera tutte le informazioni non archiviate")
    @ApiResponse(responseCode = "200", description = "Lista di informazioni recuperata con successo")
    @ApiResponse(responseCode = "500", description = "Errore interno del server")
    @GetMapping("/informazioni")
    public ResponseEntity<List<Informazione>> ottieniTutteInformazioniNonArchiviate() {
        try {
            List<Informazione> informazioni = informazioneService.trovaInformazioni();
            return ResponseEntity.ok(informazioni);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "Ottieni tutte le informazioni", description = "Recupera tutte le informazioni disponibili")
    @ApiResponse(responseCode = "200", description = "Lista di informazioni recuperata con successo")
    @ApiResponse(responseCode = "500", description = "Errore interno del server")
    @GetMapping("/informazioni/tutte")
    public ResponseEntity<List<Informazione>> ottieniTutteInformazioni() {
        try {
            List<Informazione> informazioni = informazioneService.trovaTutteInformazioni();
            return ResponseEntity.ok(informazioni);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "Ottieni solo le informazioni archiviate", description = "Recupera tutte le informazioni in archivio")
    @ApiResponse(responseCode = "200", description = "Lista di informazioni recuperata con successo")
    @ApiResponse(responseCode = "500", description = "Errore interno del server")
    @GetMapping("/informazioni/archivio")
    public ResponseEntity<List<Informazione>> ottieniInformazioniArchiviate() {
        try {
            List<Informazione> informazioni = informazioneService.trovaInformazioniArchiviate();
            return ResponseEntity.ok(informazioni);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "Modifica una informazione", description = "Permette di aggiornare i dati relativi a una informazione")
    @ApiResponse(responseCode = "200", description = "informazione aggiornata")
    @ApiResponse(responseCode = "500", description = "Errore interno del server")
    @PutMapping("/informazioni")
    public ResponseEntity<String> modificaInformazione(@RequestBody Informazione infoAggiornata) {
        try {
            Optional<Richiesta> infoVecchia = informazioneService.trovaPerId(infoAggiornata.getId());
            if (infoVecchia.isPresent()) {
            	informazioneService.validaInformazione(infoAggiornata);
                Informazione informazione = (Informazione) infoVecchia.get();
                informazione.setStatus(infoAggiornata.getStatus());
                informazione.setCognome(infoAggiornata.getCognome());
                informazione.setNome(infoAggiornata.getNome());
                informazione.setEmail(infoAggiornata.getEmail());
                informazione.setOrganizzazione(infoAggiornata.getOrganizzazione());
                informazione.setNumero(infoAggiornata.getNumero());
                informazioneService.salvaInformazione(informazione);
            }
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Informazione aggiornata con successo.");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @Operation(summary = "Ottieni le prenotazioni", description = "Recupera le prenotazioni non archiviate")
    @ApiResponse(responseCode = "200", description = "Lista di prenotazioni recuperata con successo")
    @ApiResponse(responseCode = "500", description = "Errore interno del server")
    @GetMapping("/prenotazioni")
    public ResponseEntity<List<Prenotazione>> ottieniTuttePrenotazioniNonArchiviate() {
        try {
            List<Prenotazione> prenotazioni = prenotazioneService.trovaPrenotazioni();
            return ResponseEntity.ok(prenotazioni);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "Ottieni tutte le prenotazioni", description = "Recupera tutte le prenotazioni disponibili")
    @ApiResponse(responseCode = "200", description = "Lista di prenotazioni recuperata con successo")
    @ApiResponse(responseCode = "500", description = "Errore interno del server")
    @GetMapping("/prenotazioni/tutte")
    public ResponseEntity<List<Prenotazione>> ottieniTuttePrenotazioni() {
        try {
            List<Prenotazione> prenotazioni = prenotazioneService.trovaTuttePrenotazioni();
            return ResponseEntity.ok(prenotazioni);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "Ottieni le prenotazioni archiviate", description = "Recupera tutte le prenotazioni archiviate")
    @ApiResponse(responseCode = "200", description = "Lista di prenotazioni recuperata con successo")
    @ApiResponse(responseCode = "500", description = "Errore interno del server")
    @GetMapping("/prenotazioni/archivio")
    public ResponseEntity<List<Prenotazione>> ottieniPrenotazioniArchiviate() {
        try {
            List<Prenotazione> prenotazioni = prenotazioneService.trovaPrenotazioniArchiviate();
            return ResponseEntity.ok(prenotazioni);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "Modifica una prenotazione", description = "Permette di aggiornare i dati relativi a una preno")
    @ApiResponse(responseCode = "200", description = "Prenotazione aggiornata")
    @ApiResponse(responseCode = "500", description = "Errore interno del server")
    @PutMapping("/prenotazioni")
    public ResponseEntity<String> modificaPrenotazione(@RequestBody Prenotazione prenoAggiornata) {
        try {
            Optional<Richiesta> prenoVecchia = prenotazioneService.trovaPerId(prenoAggiornata.getId());
            if (prenoVecchia.isPresent()) {
            	prenotazioneService.validaPrenotazione(prenoAggiornata);
                Prenotazione prenotazione = (Prenotazione) prenoVecchia.get();
                prenotazione.setStatus(prenoAggiornata.getStatus());
                prenotazione.setCognome(prenoAggiornata.getCognome());
                prenotazione.setNome(prenoAggiornata.getNome());
                prenotazione.setEmail(prenoAggiornata.getEmail());
                prenotazione.setOrganizzazione(prenoAggiornata.getOrganizzazione());
                prenotazione.setNumero(prenoAggiornata.getNumero());
                prenotazione.setDataInizio(prenoAggiornata.getDataInizio());
                prenotazione.setDataFine(prenoAggiornata.getDataFine());
                prenotazione.setFasciaOraria(prenoAggiornata.getFasciaOraria());
                prenotazione.setNumeroGiorni(prenoAggiornata.getNumeroGiorni());
                prenotazione.setLaboratori(prenoAggiornata.getLaboratori()); 
                prenotazione.setTipologia(prenoAggiornata.getTipologia());

                prenotazioneService.salvaPrenotazione(prenotazione);

            }
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Prenotazione aggiornata con successo.");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
    
    @Operation(summary = "Ottieni tutti gli utenti", description = "Recupera gli utenti")
    @ApiResponse(responseCode = "200", description = "Lista di utenti recuperata con successo")
    @ApiResponse(responseCode = "500", description = "Errore interno del server")
    @GetMapping("/utenti")
    public ResponseEntity<List<Utente>> ottieniTuttiUtenti() {
        try {
            List<Utente> utenti = utenteService.findAll();
            return ResponseEntity.ok(utenti);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @Operation(summary = "Ottieni utente per email", description = "Recupera l'utente")
    @ApiResponse(responseCode = "200", description = "Lista di utenti recuperata con successo")
    @ApiResponse(responseCode = "500", description = "Errore interno del server")
    @GetMapping("/utente/{email}")
    public ResponseEntity<Utente> ottieniUtentePerEmail(@PathVariable String email) {
        try {
            Utente utente = utenteService.findByEmail(email);
            return ResponseEntity.ok(utente);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "Crea nuovo utente", description = "Crea e salva un nuovo utente")
    @ApiResponse(responseCode = "201", description = "Utente aggiunto con successo")
    @ApiResponse(responseCode = "400", description = "Richiesta non valida")
    @PostMapping("/utente")
    public ResponseEntity<String> creaUtente(@RequestBody Utente utente) {
        try {
            utenteService.salvaUtente(utente);
            return ResponseEntity.status(HttpStatus.CREATED).body("Utente creato con successo.");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @Operation(summary = "Modifica utente", description = "Modifica i dati di un utente")
    @ApiResponse(responseCode = "201", description = "Utente aggiornato con successo")
    @ApiResponse(responseCode = "400", description = "Richiesta non valida")
    @PutMapping("/utente")
    public ResponseEntity<String> modificaUtente(@RequestBody Utente utente) {
    	 try {
    	        // Recupera l'utente esistente
    	        Utente existingUser = utenteService.findByEmail(utente.getEmail());
    	        
    	        // Modifica solo i campi forniti
    	        if (utente.getNome() != null) {
    	            existingUser.setNome(utente.getNome());
    	        }
    	        if (utente.getCognome() != null) {
    	            existingUser.setCognome(utente.getCognome());
    	        }
    	        if (utente.getRuolo() != null) {
    	            existingUser.setRuolo(utente.getRuolo());
    	        }
				if (utente.getPassword() != null) {
					existingUser.setPassword(utente.getPassword());
				}
    	        // Salva l'utente aggiornato
    	        utenteService.aggiornaUtente(existingUser);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Utente aggiornato con successo.");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @Operation(summary = "Elimita utente", description = "Modifica il flag cancellato di un utente rendendolo invisibile e imposta la data di cancellazione a un anno dalla data attuale")
    @ApiResponse(responseCode = "201", description = "Utente cancellato con successo")
    @ApiResponse(responseCode = "400", description = "Richiesta non valida")
    @DeleteMapping("/utente")
    public ResponseEntity<String> eliminaUtente(@RequestBody String email) {
    	try {
            utenteService.eliminaUtente(email);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Utente cancellato con successo.");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

}
