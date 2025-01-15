package com.puzzle_lab.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.puzzle_lab.entities.Richiesta;
import com.puzzle_lab.services.EmailService;

import jakarta.mail.MessagingException;

@RestController
public class EmailController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/sendEmail")
    public String sendEmail(@RequestBody Richiesta richiesta) {
    	try {
            emailService.emailRichiesta(richiesta);
            return "Email inviata con successo!";
        } catch (MessagingException e) {
            return "Errore durante l'invio dell'email: " + e.getMessage();
        }
    }
}


