package com.puzzle_lab;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ProgettoBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProgettoBackendApplication.class, args);
	}

}
