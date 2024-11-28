package com.puzzle_lab.repos;

import org.springframework.data.jpa.repository.JpaRepository;

import com.puzzle_lab.entities.Richiesta;

public interface CancellamiDAO extends JpaRepository<Richiesta, Integer>{

}
