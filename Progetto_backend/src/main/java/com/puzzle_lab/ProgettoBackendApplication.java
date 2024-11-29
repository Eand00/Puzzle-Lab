package com.puzzle_lab;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.puzzle_lab.services.EmailService;

/*
@SpringBootApplication
public class ProgettoBackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(ProgettoBackendApplication.class, args);
	}
}*/

@SpringBootApplication
public class ProgettoBackendApplication implements CommandLineRunner {

    @Autowired
    private EmailService emailService;

    public static void main(String[] args) {
        SpringApplication.run(ProgettoBackendApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        emailService.sendSimpleEmail("om.di.pagl@gmail.com", "Ciao", "Benvenuto!");
        System.out.println("Email inviata con successo!");
    }
}
