package com.puzzle_lab.controllers;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.puzzle_lab.services.JWTService;

@RestController
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager; // Gestisce il processo di autenticazione degli utenti di backoffice

    @Autowired
    private JWTService jwtService; // Servizio per generare e gestire i token JWT

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestHeader("Authorization") String authHeader) {
        // Controlla se l'header Authorization è presente e segue il formato "Basic <credenziali>"
        if (authHeader == null || !authHeader.startsWith("Basic ")) {
            return ResponseEntity.status(401).body("Authorization header must be provided and start with 'Basic'");
        }

        // Estrae le credenziali Base64 dall'header (rimuovendo "Basic ")
        String base64Credentials = authHeader.substring(6); 
        // Decodifica le credenziali Base64
        String decodedCredentials = new String(Base64.getDecoder().decode(base64Credentials));
        // Divide le credenziali nel formato "username:password"
        String[] credentials = decodedCredentials.split(":", 2);

        // Controlla che il formato delle credenziali sia valido (username e password devono essere presenti)
        if (credentials.length != 2) {
            return ResponseEntity.status(400).body("Invalid Basic Authentication header format");
        }

        // Estrae il nome utente e la password
        String username = credentials[0];
        String password = credentials[1];

        try {
            // Autentica l'utente utilizzando l'AuthenticationManager
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
            );

            // Genera un token JWT per l'utente autenticato
            String token = jwtService.generaToken(authentication.getName());

            // Prepara una risposta contenente il token
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);

            return ResponseEntity.ok(response); // Ritorna il token con codice HTTP 200 (OK)

        } catch (AuthenticationException e) {
            // Gestisce un'eventuale autenticazione fallita (es. credenziali non valide)
            return ResponseEntity.status(401).body("Invalid username or password");
        } catch (IllegalArgumentException | IllegalStateException e) {
            // Gestisce errori inattesi, ad esempio nella decodifica o altre eccezioni
            return ResponseEntity.status(400).body("Invalid request: " + e.getMessage());
        }
    }
}
