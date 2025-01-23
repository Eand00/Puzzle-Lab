package com.puzzle_lab.repos;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.puzzle_lab.entities.Utente;

import jakarta.transaction.Transactional;

public interface UtenteDAO extends JpaRepository<Utente, String>{

	@Modifying
	@Transactional
	@Query("DELETE FROM Utente u WHERE u.dataPrevistaCancellazione < :currentTime")
	void deleteByDeleteScheduledAtBefore(@Param("currentTime") LocalDateTime currentTime);
	
	Utente findByEmail(String email);

}
