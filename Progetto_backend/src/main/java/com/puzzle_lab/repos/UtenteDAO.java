package com.puzzle_lab.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.puzzle_lab.entities.Utente;

public interface UtenteDAO extends JpaRepository<Utente, String>{

}
