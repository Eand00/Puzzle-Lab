package com.puzzle_lab.repos;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.puzzle_lab.entities.Richiesta;

import jakarta.transaction.Transactional;

public interface RichiestaDAO extends JpaRepository<Richiesta,Long> {

	Optional<Richiesta> findByEmail(String email);

	boolean existsByEmail(String email);
	
	@Modifying
	@Transactional
	@Query("DELETE FROM Richiesta u WHERE u.dataPrevistaCancellazione < :currentTime")
	void deleteByDeleteScheduledAtBefore(@Param("currentTime") LocalDateTime currentTime);


}
