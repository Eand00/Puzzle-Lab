package com.puzzle_lab.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.puzzle_lab.entities.Prenotazione;
import java.util.Optional;

public interface PrenotazioneDAO extends JpaRepository<Prenotazione, Long>{
	
	Optional<Prenotazione> findByEmail(String email);

	boolean existsByEmail(String email);

}
