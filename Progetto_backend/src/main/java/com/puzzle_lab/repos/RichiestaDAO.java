package com.puzzle_lab.repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.puzzle_lab.entities.Richiesta;

public interface RichiestaDAO extends JpaRepository<Richiesta,Long> {

	Optional<Richiesta> findByEmail(String email);

	boolean existsByEmail(String email);
	
}
