package com.puzzle_lab.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.puzzle_lab.services.EmailService;

@RestController
public class EmailController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/sendEmail")
    public String sendEmail(@RequestParam String to, @RequestParam String subject, @RequestParam String body) {
    	try {
            emailService.sendSimpleEmail(to, subject, body);
            return "Email inviata con successo!";
        } catch (Exception e) {
            return "Errore durante l'invio dell'email: " + e.getMessage();
        }
    }
}


