package com.puzzle_lab.services;

import java.util.List;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.puzzle_lab.entities.EmailTemplate;
import com.puzzle_lab.entities.Informazione;
import com.puzzle_lab.entities.Prenotazione;
import com.puzzle_lab.entities.Richiesta;
import com.puzzle_lab.entities.Utente;
import com.puzzle_lab.repos.EmailDAO;

import jakarta.annotation.PostConstruct;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UtenteService utenteService;

    @Autowired
    private EmailDAO emailDAO;

    //private static boolean firstTime = true;

    private EmailTemplate config;

    @PostConstruct
    private void init() {
    	config = emailDAO.findByUsatoTrue();
    	System.out.println("template recuperato");
    	mailSender = createMailSender();
    	System.out.println("MailSender inizializzato");
    }

    public JavaMailSender createMailSender() {

        // Crea l'istanza di JavaMailSender
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(config.getHost());
        mailSender.setPort(config.getPort());
        mailSender.setUsername(config.getUsername());
        mailSender.setPassword(config.getPassword());

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");

        switch (config.getEncryptionType()) {
	        case TLS:
	            props.put("mail.smtp.starttls.enable", "true");
	            break;
	        case SSL:
	            props.put("mail.smtp.ssl.enable", "true");
	            break;
	        case NONE:
	            // Nessuna crittografia
	            break;
	        default:
	            throw new IllegalArgumentException("Unsupported encryption type: " + config.getEncryptionType());
        }

        return mailSender;
    }

    public void sendEmail(String to, String body, String subject, boolean isHTML) throws MessagingException {
    	/*
    	if(firstTime) { // alla prima esecuzione recupera i dati e configura mailSender
    		getEmail();
    		mailSender = createMailSender();
    		firstTime = false;
    		System.out.println("MailSender initialized");
    	}*/
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        // Configura i campi principali dell'email
        helper.setTo(to);//destinatario
        helper.setSubject(subject);//oggetto
        helper.setText(body, isHTML); // Il parametro "true" indica che il contenuto è HTML

        // Invio dell'email
        mailSender.send(mimeMessage);
    }

    //manda le email in seguito al ricevimento di una richiesta dal form
    public void emailRichiesta(Richiesta richiesta) throws MessagingException {
    	sendEmail(richiesta.getEmail(),config.getCorpo().replace("{{NOME_UTENTE}}", richiesta.getNome()), config.getOggetto(), true);

    	String corpo = "Hai ricevuto una richiesta da "+ richiesta.getNome()
    		+ " " + richiesta.getCognome()
    		+ "\norgainzzazione: " + richiesta.getOrganizzazione()
    		+ "\nemail: " + richiesta.getEmail()
    		+ "\nnumero: " + richiesta.getNumero();
    	if(richiesta instanceof Prenotazione) {
    		corpo += "\ndisponibilità: " + ((Prenotazione)richiesta).getDataInizio()
    				+" - "+((Prenotazione)richiesta).getDataFine();
    	}else {
    		corpo += "\nrichiesta: " + ((Informazione)richiesta).getTesto();
    	}

    	List<Utente> utenti = utenteService.findAll();
    	for (Utente utente : utenti) {
			sendEmail(utente.getEmail(),corpo,"Nuova Richiesta",false);
		}
    }
}