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

	@Scheduled(cron = "0 0 0 * * ?")
	public void deleteExpiredUsers() {
        LocalDateTime ora = LocalDateTime.now();
        richiestaDAO.deleteByDeleteScheduledAtBefore(ora);
        utenteDAO.deleteByDeleteScheduledAtBefore(ora);
    }
}
