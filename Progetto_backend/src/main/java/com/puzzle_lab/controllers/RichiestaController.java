package com.puzzle_lab.controllers;

import com.puzzle_lab.entities.Informazione;
import com.puzzle_lab.entities.Prenotazione;
import com.puzzle_lab.services.InformazioneService;
import com.puzzle_lab.services.PrenotazioneService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Richiesta", description = "Gestione delle richieste di informazioni e prenotazioni")
@RestController
@RequestMapping("/richieste")
public class RichiestaController {

    @Autowired
    private InformazioneService informazioneService;

    @Autowired
    private PrenotazioneService prenotazioneService;

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

    @Operation(summary = "Crea una nuova informazione", description = "Crea e salva una nuova informazione")
    @ApiResponse(responseCode = "201", description = "Informazione creata con successo")
    @ApiResponse(responseCode = "400", description = "Richiesta non valida")
    @PostMapping("/informazioni")
    public ResponseEntity<String> creaInformazione(@RequestBody Informazione informazione) {
        try {
            informazioneService.salvaInformazione(informazione);
            return ResponseEntity.status(HttpStatus.CREATED).body("Informazione creata con successo.");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
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

    @Operation(summary = "Crea una nuova prenotazione", description = "Crea e salva una nuova prenotazione")
    @ApiResponse(responseCode = "201", description = "Prenotazione creata con successo")
    @ApiResponse(responseCode = "400", description = "Richiesta non valida")
    @PostMapping("/prenotazioni")
    public ResponseEntity<String> creaPrenotazione(@RequestBody Prenotazione prenotazione) {
        try {
            prenotazioneService.salvaPrenotazione(prenotazione);
            return ResponseEntity.status(HttpStatus.CREATED).body("Prenotazione creata con successo.");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}
