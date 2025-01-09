package com.puzzle_lab.repos;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.puzzle_lab.entities.Richiesta;
import com.puzzle_lab.entities.Status;

public interface RichiestaDAO extends JpaRepository<Richiesta,Long> {

	Optional<Richiesta> findByEmail(String email);
	
    @Query("SELECT r FROM Richiesta r WHERE r.status = :status")
    Optional<Richiesta> findByStatus(@Param("status") Status status);
	
	Optional<Richiesta> findByDataCreazione(LocalDateTime data);

	boolean existsByEmail(String email);

	@Query("SELECT r FROM Richiesta r WHERE r.nome LIKE CONCAT('%', :nome, '%')")
	Optional<Richiesta> findByNome(@Param("nome")String nome);
	
	Optional<Richiesta> findByNomeContainingIgnoreCase(String nome);

	
}
