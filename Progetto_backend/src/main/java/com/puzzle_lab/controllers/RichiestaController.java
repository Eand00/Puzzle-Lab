package com.puzzle_lab.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.puzzle_lab.entities.Informazione;
import com.puzzle_lab.entities.Prenotazione;
import com.puzzle_lab.services.EmailService;
import com.puzzle_lab.services.InformazioneService;
import com.puzzle_lab.services.PrenotazioneService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;

@Tag(name = "Richiesta", description = "Gestione delle richieste di informazioni e prenotazioni")
@RestController
@RequestMapping("/richieste")
public class RichiestaController {

    @Autowired
    private InformazioneService informazioneService;

    @Autowired
    private PrenotazioneService prenotazioneService;

    @Autowired
    private EmailService emailService;


    @Operation(summary = "Crea una nuova informazione", description = "Crea e salva una nuova informazione")
    @ApiResponse(responseCode = "201", description = "Informazione creata con successo")
    @ApiResponse(responseCode = "400", description = "Richiesta non valida")
    @PostMapping("/informazioni")
    public ResponseEntity<String> creaInformazione(@RequestBody Informazione informazione) {
        try {
            informazioneService.salvaInformazione(informazione);
            emailService.emailRichiesta(informazione);
            return ResponseEntity.status(HttpStatus.CREATED).body("Informazione creata con successo.");
        } catch (IllegalArgumentException | MessagingException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }


    @Operation(summary = "Crea una nuova prenotazione", description = "Crea e salva una nuova prenotazione")
    @ApiResponse(responseCode = "201", description = "Prenotazione creata con successo")
    @ApiResponse(responseCode = "400", description = "Richiesta non valida")
    @PostMapping("/prenotazioni")
    public ResponseEntity<String> creaPrenotazione(@RequestBody Prenotazione prenotazione) {
        try {
            prenotazioneService.salvaPrenotazione(prenotazione);
            emailService.emailRichiesta(prenotazione);
            return ResponseEntity.status(HttpStatus.CREATED).body("Prenotazione creata con successo.");
        } catch (IllegalArgumentException | MessagingException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}
