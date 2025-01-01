package com.puzzle_lab;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(exclude = {org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class})
public class ProgettoBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProgettoBackendApplication.class, args);
	}

}
