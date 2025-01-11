package com.puzzle_lab.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.puzzle_lab.entities.Informazione;
import com.puzzle_lab.entities.Status;


public interface InformazioneDAO extends JpaRepository<Informazione, Long> {
	
	List<Informazione> findByStatus(Status status);
	List<Informazione> findByStatusNot(Status status);
}
