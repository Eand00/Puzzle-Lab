package com.puzzle_lab.services;

import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;

import io.jsonwebtoken.security.Keys;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;

@Component
public class JWTService {

    private String chiaveSegreta = "ChiaveSuperSegretaAlmeno32Caratteri!";

    private long scadenzaToken = 3600000; // 1 ora

    public JWTService() {

        try {
            KeyGenerator keyGen = KeyGenerator.getInstance("HmacSHA256");
            SecretKey sk = keyGen.generateKey();
            chiaveSegreta = Base64.getEncoder().encodeToString(sk.getEncoded());
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    
    public String generaToken(String email) {
    	Map<String, Object> claims = new HashMap<>();
        return Jwts.builder()
        		.claims()
        		.add(claims)
                .subject(email)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + scadenzaToken))
                .and()
                .signWith(ottieniChiave())
                .compact();
    }

    private SecretKey ottieniChiave() {
        byte[] keyBytes = Decoders.BASE64.decode(chiaveSegreta);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    
    public String estraiEmail(String token) {
        return estraiClaim(token, Claims::getSubject);
    }

    private <T> T estraiClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = estraiTutteClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims estraiTutteClaims(String token) {
        return Jwts.parser()
                .verifyWith(ottieniChiave())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean validaToken(String token, UserDetails userDetails) {
        final String userName = estraiEmail(token);
        return (userName.equals(userDetails.getUsername()) && !tokenScaduto(token));
    }

    private boolean tokenScaduto(String token) {
        return estraiDataScadenza(token).before(new Date());
    }

    private Date estraiDataScadenza(String token) {
        return estraiClaim(token, Claims::getExpiration);
    }
}
