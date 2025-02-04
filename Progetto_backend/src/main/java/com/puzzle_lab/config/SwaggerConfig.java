package com.puzzle_lab.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class SwaggerConfig {

	@Bean
	public OpenAPI customOpenAPI() {
	    return new OpenAPI()
	        .info(new Info().title("API Documentation").version("1.0"))
	        
	        // Aggiunge requisiti di sicurezza per le API, in questo caso sia basicAuth che bearerAuth
	        .addSecurityItem(new SecurityRequirement().addList("basicAuth")) 
	        .addSecurityItem(new SecurityRequirement().addList("bearerAuth")) 
	        
	        // Configura gli schemi di sicurezza disponibili per l'applicazione
	        .components(new io.swagger.v3.oas.models.Components()
	            .addSecuritySchemes("basicAuth", new SecurityScheme()
	                .type(SecurityScheme.Type.HTTP) 
	                .scheme("basic")) // Metodo di autenticazione: Basic Authentication
	            
	            // Definisce lo schema di sicurezza per bearerAuth (autenticazione basata su token JWT)
	            .addSecuritySchemes("bearerAuth", new SecurityScheme()
	                .type(SecurityScheme.Type.HTTP) 
	                .scheme("bearer") 
	                .bearerFormat("JWT"))); 

    }
}
