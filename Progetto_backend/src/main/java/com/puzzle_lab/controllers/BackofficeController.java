package com.puzzle_lab.controllers;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.puzzle_lab.entities.Informazione;
import com.puzzle_lab.entities.Prenotazione;
import com.puzzle_lab.entities.Richiesta;
import com.puzzle_lab.services.InformazioneService;
import com.puzzle_lab.services.PrenotazioneService;
import com.puzzle_lab.services.RichiestaService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.models.parameters.RequestBody;

@RestController
@RequestMapping("/back-office")
public class BackofficeController {

	@Autowired
    private InformazioneService informazioneService;

    @Autowired
    private PrenotazioneService prenotazioneService;
    
    @Autowired
    private RichiestaService richiestaService;
    
    
    @Operation(summary = "Ottieni tutte le richieste", description = "Recupera tutte le richieste")
    @ApiResponse(responseCode = "200", description = "Lista di richieste recuperata con successo")
    @ApiResponse(responseCode = "500", description = "Errore interno del server")
    @GetMapping("/richieste")
    public ResponseEntity<List<Richiesta>> getTutteRichieste() {
        try {
            List<Richiesta> richieste = richiestaService.trovaTutte();
            return ResponseEntity.ok(richieste);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @Operation(summary = "Ottieni le richieste con status x", description = "Recupera tutte le richieste con un determinato status")
    @ApiResponse(responseCode = "200", description = "Lista di richieste recuperata con successo")
    @ApiResponse(responseCode = "500", description = "Errore interno del server")
    @GetMapping("/richieste/status")
    public ResponseEntity<Optional<Richiesta>> getRichiestePerStatus(@RequestParam(required = false) String status) {
        try {
            Optional<Richiesta> richieste = richiestaService.trovaPerStatus(status);
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
    
    @Operation(summary = "Ottieni tutte le informazioni", description = "Recupera tutte le informazioni disponibili")
    @ApiResponse(responseCode = "200", description = "Lista di informazioni recuperata con successo")
    @ApiResponse(responseCode = "500", description = "Errore interno del server")
    @GetMapping("/informazioni")
    public ResponseEntity<List<Informazione>> getTutteInformazioni() {
        try {
            List<Informazione> informazioni = informazioneService.trovaTutteInformazioni();
            return ResponseEntity.ok(informazioni);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @Operation(summary = "Ottieni tutte le prenotazioni", description = "Recupera tutte le prenotazioni disponibili")
    @ApiResponse(responseCode = "200", description = "Lista di prenotazioni recuperata con successo")
    @ApiResponse(responseCode = "500", description = "Errore interno del server")
    @GetMapping("/prenotazioni")
    public ResponseEntity<List<Prenotazione>> getTuttePrenotazioni() {
        try {
            List<Prenotazione> prenotazioni = prenotazioneService.trovaTuttePrenotazioni();
            return ResponseEntity.ok(prenotazioni);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
}
