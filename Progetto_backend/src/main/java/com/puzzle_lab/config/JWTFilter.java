package com.puzzle_lab.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import com.puzzle_lab.services.CustomUserDetailsService;
import com.puzzle_lab.services.JWTService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Service
public class JWTFilter extends OncePerRequestFilter {

    @Autowired
    private JWTService jwtService; // Servizio per gestire la generazione, estrazione e validazione dei token JWT

    @Autowired
    ApplicationContext context; // Contesto dell'applicazione per ottenere i bean necessari dinamicamente

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) 
            throws ServletException, IOException {

        // Estrae l'header "Authorization" dalla richiesta
        String header = request.getHeader("Authorization");
        String token = null;
        String email = null;

        // Controlla se l'header è presente e se inizia con "Bearer " (standard per i token JWT)
        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7); // Rimuove "Bearer " per ottenere il token puro
            email = jwtService.estraiEmail(token); // Estrae l'email dal token utilizzando il servizio JWT
        }

        // Se l'email è presente e il contesto di sicurezza non è già autenticato
        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Recupera i dettagli dell'utente utilizzando il servizio CustomUserDetailsService
            UserDetails userDetails = context.getBean(CustomUserDetailsService.class).loadUserByUsername(email);

            // Valida il token JWT con i dettagli dell'utente
            if (jwtService.validaToken(token, userDetails)) {
                // Crea un'istanza di autenticazione con i dettagli dell'utente e le sue autorizzazioni
                UsernamePasswordAuthenticationToken authToken = 
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                
                // Associa i dettagli della richiesta (ad esempio, IP, sessione) all'autenticazione
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                
                // Imposta l'autenticazione nel contesto di sicurezza di Spring
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // Continua la catena di filtri per processare la richiesta
        filterChain.doFilter(request, response);
    }
}
