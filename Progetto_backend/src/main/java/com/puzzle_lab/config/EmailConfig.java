package com.puzzle_lab.config;

import java.util.Properties;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class EmailConfig {

    // Definisce un bean per configurare e restituire un'istanza di JavaMailSender
    @Bean
    public JavaMailSender javaMailSender() {
        // Crea un'istanza di JavaMailSenderImpl che implementa JavaMailSender
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        
        // Configura l'host del server SMTP (in questo caso, Gmail)
        mailSender.setHost("smtp.gmail.com");
        
        // Configura la porta SMTP (587 è la porta standard per STARTTLS con Gmail)
        mailSender.setPort(587);

        // Imposta le credenziali per autenticarsi al server SMTP
        mailSender.setUsername("caccia.saperi@gmail.com"); // Email utilizzata per inviare i messaggi
        mailSender.setPassword("aomc iqez fopo kcnu"); // Password specifica per l'applicazione

        // Configura le proprietà aggiuntive per la connessione al server SMTP
        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp"); // Specifica il protocollo di trasporto
        props.put("mail.smtp.auth", "true"); // Abilita l'autenticazione SMTP
        props.put("mail.smtp.starttls.enable", "true"); // Abilita STARTTLS per la connessione sicura

        // Restituisce l'istanza configurata di JavaMailSender
        return mailSender;
    }
}
