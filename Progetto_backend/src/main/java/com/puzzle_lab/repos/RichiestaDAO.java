package com.puzzle_lab.repos;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.puzzle_lab.entities.Richiesta;
import com.puzzle_lab.entities.Status;

public interface RichiestaDAO extends JpaRepository<Richiesta,Long> {
	
    List<Richiesta> findByStatus(Status status);
    List<Richiesta> findByStatusNot(Status status);
    
	Optional<Richiesta> findByDataCreazione(LocalDateTime data);
	
	@Query("SELECT r FROM Richiesta r WHERE r.nome LIKE CONCAT('%', :nome, '%')")
	Optional<List<Richiesta>> findByNome(@Param("nome")String nome);
	
	@Query("SELECT r FROM Richiesta r WHERE r.cognome LIKE CONCAT('%', :cognome, '%')")
	Optional<List<Richiesta>> findByCognome(@Param("cognome")String cognome);
	
	@Query("SELECT r FROM Richiesta r WHERE r.email LIKE CONCAT('%', :email, '%')")
	Optional<List<Richiesta>> findByEmail(@Param("email")String email);
	
	@Query("SELECT r FROM Richiesta r WHERE r.organizzazione LIKE CONCAT('%', :organizzazione, '%')")
	Optional<List<Richiesta>> findByOrganizzazione(@Param("organizzazione")String organizzazione);

	boolean existsByEmail(String email);
}
