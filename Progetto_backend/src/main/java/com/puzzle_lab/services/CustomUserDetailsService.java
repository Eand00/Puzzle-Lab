package com.puzzle_lab.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.puzzle_lab.entities.Utente;
import com.puzzle_lab.repos.UtenteDAO;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UtenteDAO utenteDAO;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<Utente> utente = utenteDAO.findById(email);
        if (utente.isEmpty()) {
            throw new UsernameNotFoundException("Utente con email " + email + " non trovato.");
        }

        Utente u = utente.get();
        User.UserBuilder builder = User.withUsername(u.getEmail());
        builder.password(u.getPassword());
        builder.roles(u.getRuolo());
        return builder.build();
    }
}