package com.puzzle_lab.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="utenti")
public class Utente {
	
	@Id
	private String Email;
	private String ruolo;
	private String nome;
	private String cognome; 

}
