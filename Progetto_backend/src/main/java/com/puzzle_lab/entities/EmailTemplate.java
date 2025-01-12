package com.puzzle_lab.entities;

import org.hibernate.annotations.SQLRestriction;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="email-template")
public class EmailTemplate {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	private String host; //smtp.gmail.com
    private int port; //587
    private String username; //mittente dell'email
    private String password; //password per app generata
	
    @Enumerated(EnumType.STRING)
    private EncryptionType encryptionType; //protocollo di crittografia
    
	private String oggetto;
	
	@Column(columnDefinition = "TEXT")
	private String corpo;
	
	private boolean usato;
	
	public enum EncryptionType {
		NONE, TLS, SSL 
	}
}

