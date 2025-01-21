package com.puzzle_lab.entities;

import java.time.LocalDateTime;

import org.hibernate.annotations.SQLRestriction;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@SQLRestriction("cancellato = false")
@Table(name="utenti")
public class Utente {

	@Id
    @Column(nullable = false, unique = true)
	private String email;
	@Column(nullable = false)
	private String ruolo;
	@Column(nullable = false)
	private String nome;
	@Column(nullable = false)
	private String cognome;
	@Column(nullable = false)
	private String password;
	private boolean cancellato = false;
    private LocalDateTime dataPrevistaCancellazione;


}
