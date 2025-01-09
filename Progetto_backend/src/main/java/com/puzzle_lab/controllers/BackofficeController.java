package com.puzzle_lab.controllers;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.puzzle_lab.entities.Informazione;
import com.puzzle_lab.entities.Prenotazione;
import com.puzzle_lab.entities.Richiesta;
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
    
    @Operation(summary = "Ottieni le richieste", description = "Recupera tutte le richieste non archiviate")
    @ApiResponse(responseCode = "200", description = "Lista di richieste recuperata con successo")
    @ApiResponse(responseCode = "500", description = "Errore interno del server")
    @GetMapping("/richieste")
    public ResponseEntity<List<Richiesta>> getRichieste() {
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
    public ResponseEntity<List<Richiesta>> getTutteRichieste() {
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
    public ResponseEntity<List<Richiesta>> getRichiesteArchiviate() {
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
    public ResponseEntity<List<Richiesta>> getRichiestePerStatus(@RequestParam(required = false) String status) {
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
    public ResponseEntity<List<Richiesta>> getRichiestePerNome(@RequestParam(required = false) String nome) {
        try {
            List<Richiesta> richieste = richiestaService.trovaPerNome(nome);
            return ResponseEntity.ok(richieste);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @Operation(summary = "Ottieni le richieste con cognome x", description = "Recupera tutte le richieste che contengono il parametro nel campo cognome")
    @ApiResponse(responseCode = "200", description = "Lista di richieste recuperata con successo")
    @ApiResponse(responseCode = "500", description = "Errore interno del server")
    @GetMapping("/richieste/cognome")
    public ResponseEntity<List<Richiesta>> getRichiestePerCognome(@RequestParam(required = false) String cognome) {
        try {
            List<Richiesta> richieste = richiestaService.trovaPerCognome(cognome);
            return ResponseEntity.ok(richieste);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @Operation(summary = "Ottieni le richieste con email x", description = "Recupera tutte le richieste che contengono il parametro nel campo email")
    @ApiResponse(responseCode = "200", description = "Lista di richieste recuperata con successo")
    @ApiResponse(responseCode = "500", description = "Errore interno del server")
    @GetMapping("/richieste/email")
    public ResponseEntity<List<Richiesta>> getRichiestePerEmail(@RequestParam(required = false) String email) {
        try {
            List<Richiesta> richieste = richiestaService.trovaPerEmail(email);
            return ResponseEntity.ok(richieste);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @Operation(summary = "Ottieni le richieste con organizzazione x", description = "Recupera tutte le richieste che contengono il parametro nel campo organizzazione")
    @ApiResponse(responseCode = "200", description = "Lista di richieste recuperata con successo")
    @ApiResponse(responseCode = "500", description = "Errore interno del server")
    @GetMapping("/richieste/organizzazione")
    public ResponseEntity<List<Richiesta>> getRichiestePerOrganizzazione(@RequestParam(required = false) String organizzazione) {
        try {
            List<Richiesta> richieste = richiestaService.trovaPerOrganizzazione(organizzazione);
            return ResponseEntity.ok(richieste);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @Operation(summary = "Ottieni le richieste con data x", description = "Recupera tutte le richieste che hanno una certa data di creazione")
    @ApiResponse(responseCode = "200", description = "Lista di richieste recuperata con successo")
    @ApiResponse(responseCode = "500", description = "Errore interno del server")
    @GetMapping("/richieste/data")//formato data: 2025-01-04T21:30:27
    public ResponseEntity<Optional<Richiesta>> getRichiestePerData(@RequestParam(required = false) LocalDateTime data) {
        try {
            Optional<Richiesta> richieste = richiestaService.trovaPerData(data);
            return ResponseEntity.ok(richieste);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @Operation(summary = "Ottieni le informazioni", description = "Recupera tutte le informazioni non archiviate")
    @ApiResponse(responseCode = "200", description = "Lista di informazioni recuperata con successo")
    @ApiResponse(responseCode = "500", description = "Errore interno del server")
    @GetMapping("/informazioni")
    public ResponseEntity<List<Informazione>> getInformazioni() {
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
    public ResponseEntity<List<Informazione>> getTutteInformazioni() {
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
    public ResponseEntity<List<Informazione>> getInformazioniArchiviate() {
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
    public ResponseEntity<String> updateInformazione(@RequestBody Informazione infoAggiornata) {
        try {
            Optional<Richiesta> infoVecchia = informazioneService.trovaPerId(infoAggiornata.getId());
            if (infoVecchia.isPresent()) {
                Informazione informazione = (Informazione) infoVecchia.get();
                informazione.setStatus(infoAggiornata.getStatus());
                informazione.setCognome(infoAggiornata.getCognome());
                informazione.setNome(infoAggiornata.getNome());
                informazione.setEmail(infoAggiornata.getEmail());
                informazione.setOrganizzazione(infoAggiornata.getOrganizzazione());
                informazione.setNumero(infoAggiornata.getNumero());
                informazioneService.save(informazione);
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
    public ResponseEntity<List<Prenotazione>> getPrenotazioni() {
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
    public ResponseEntity<List<Prenotazione>> getTuttePrenotazioni() {
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
    public ResponseEntity<List<Prenotazione>> getPrenotazioniArchiviate() {
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
    public ResponseEntity<String> updatePrenotazione(@RequestBody Prenotazione prenoAggiornata) {
        try {
            Optional<Richiesta> prenoVecchia = prenotazioneService.trovaPerId(prenoAggiornata.getId());
            if (prenoVecchia.isPresent()) {
                Prenotazione prenotazione = (Prenotazione) prenoVecchia.get();
                prenotazione.setStatus(prenoAggiornata.getStatus());
                prenotazione.setCognome(prenoAggiornata.getCognome());
                prenotazione.setNome(prenoAggiornata.getNome());
                prenotazione.setEmail(prenoAggiornata.getEmail());
                prenotazione.setOrganizzazione(prenoAggiornata.getOrganizzazione());
                prenotazione.setNumero(prenoAggiornata.getNumero());
                prenotazione.setDataInizio(prenoAggiornata.getDataInizio());
                prenotazione.setDataFine(prenoAggiornata.getDataFine());
                prenotazioneService.save(prenotazione);
            }
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Prenotazione aggiornata con successo.");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
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
            utenteService.aggiornaUtente(utente);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Utente aggiornato con successo.");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
    
}
