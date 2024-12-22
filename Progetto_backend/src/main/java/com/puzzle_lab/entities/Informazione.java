package com.puzzle_lab.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name="informazioni")
public class Informazione extends Richiesta{

	@Column(nullable = false, columnDefinition = "TEXT")
	private String testo;
}
