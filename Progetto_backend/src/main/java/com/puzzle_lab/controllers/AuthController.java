package com.puzzle_lab.controllers;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.puzzle_lab.services.JWTService;

@RestController
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTService jwtService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Basic ")) {
            return ResponseEntity.status(401).body("Authorization header must be provided and start with 'Basic'");
        }

        // Extract the Base64-encoded credentials
        String base64Credentials = authHeader.substring(6); // Remove "Basic "
        String decodedCredentials = new String(Base64.getDecoder().decode(base64Credentials));
        String[] credentials = decodedCredentials.split(":", 2);

        if (credentials.length != 2) {
            return ResponseEntity.status(400).body("Invalid Basic Authentication header format");
        }

        String username = credentials[0];
        String password = credentials[1];

        try {
	        // Authenticate the user
	        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(username, password));
	        // Generate the JWT token
	        String token = jwtService.generaToken(authentication.getName());
	
	        // Return token in a response map
	        Map<String, Object> response = new HashMap<>();
	        response.put("token", token);
	
	        return ResponseEntity.ok(response);
	        
	    } catch (AuthenticationException e) {
	        // Handle authentication failure
	        return ResponseEntity.status(401).body("Invalid username or password");
	    } catch (IllegalArgumentException | IllegalStateException e) {
	        // Handle issues with decoding or other unexpected errors
	        return ResponseEntity.status(400).body("Invalid request: " + e.getMessage());
	    }

    
    }
}
