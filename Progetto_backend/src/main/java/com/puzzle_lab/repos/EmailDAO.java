package com.puzzle_lab.repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.puzzle_lab.entities.EmailTemplate;

public interface EmailDAO extends JpaRepository<EmailTemplate, Long> {
	
	Optional<EmailTemplate> findById(Long Id);
}


