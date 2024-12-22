package com.puzzle_lab.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to) throws MessagingException {

        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

        // Configura i campi principali dell'email
        helper.setTo(to);//destinatario
        helper.setSubject("Subject");//oggetto
        helper.setFrom("tuo_account@gmail.com");//mittente

        // Corpo HTML dell'email
        String htmlContent = """
            <html>
            <body>
                <h1 style="color: #3498db;">Ciao!</h1>
                <p>Questa è una <strong>email di prova</strong> con HTML.</p>
                <p style="color: gray;">Grazie per aver usato il nostro servizio!</p>
                <a href="https://www.tuosito.com" style="background-color: #3498db; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">Visita il nostro sito</a>
            </body>
            </html>
        """;

        helper.setText(htmlContent, true); // Il parametro "true" indica che il contenuto è HTML

        // Invio dell'email
        mailSender.send(mimeMessage);
    }
}