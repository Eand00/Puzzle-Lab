package com.puzzle_lab.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.puzzle_lab.entities.Prenotazione;
import com.puzzle_lab.entities.Status;

public interface PrenotazioneDAO extends JpaRepository<Prenotazione, Long>{

	List<Prenotazione> findByStatusNot(Status status);
	List<Prenotazione> findByStatus(Status status);
}
