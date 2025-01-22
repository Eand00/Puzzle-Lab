package com.puzzle_lab.entities;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "prenotazioni")
public class Prenotazione extends Richiesta {

    @Column(name = "data_inizio", nullable = false)
    private LocalDate dataInizio;

    @Column(name = "data_fine", nullable = false)
    private LocalDate dataFine;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String testo;

    @Column(nullable = false)
    private String laboratori;

    @Enumerated(EnumType.STRING)
    @Column(name = "fascia_oraria")
    private FasciaOraria fasciaOraria;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Tipologia tipologia;

    @Column(name = "numero_giorni")
    private Integer numeroGiorni;

}
