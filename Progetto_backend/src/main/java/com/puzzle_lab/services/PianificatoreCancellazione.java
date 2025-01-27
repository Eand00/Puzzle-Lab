package com.puzzle_lab.services;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.puzzle_lab.repos.RichiestaDAO;
import com.puzzle_lab.repos.UtenteDAO;

@Component
public class PianificatoreCancellazione {

 @Autowired
 private UtenteDAO utenteDAO;

 @Autowired
 private RichiestaDAO richiestaDAO;

 // Il cron "0 0 0 * * ?" indica che il metodo sarà eseguito ogni giorno a mezzanotte.
 @Scheduled(cron = "0 0 0 * * ?")
 public void deleteExpiredUsers() {
     // Recupera l'ora corrente per usarla come riferimento nelle query di eliminazione.
     LocalDateTime ora = LocalDateTime.now();

     // Elimina le richieste scadute. Viene utilizzato un metodo custom del repository RichiestaDAO
     richiestaDAO.deleteByDeleteScheduledAtBefore(ora);

     // Elimina gli utenti scaduti. Viene utilizzato un metodo custom del repository UtenteDAO
     utenteDAO.deleteByDeleteScheduledAtBefore(ora);
 }
}

