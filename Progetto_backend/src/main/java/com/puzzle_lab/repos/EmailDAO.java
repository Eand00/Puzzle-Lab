package com.puzzle_lab.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.puzzle_lab.entities.EmailTemplate;

public interface EmailDAO extends JpaRepository<EmailTemplate, Long> {

	EmailTemplate findByUsatoTrue();
}


