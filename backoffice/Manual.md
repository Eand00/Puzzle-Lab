# Manuale Utente Backoffice - Caccia SAPERI 

## Indice
1. [Accesso al Sistema](#accesso-al-sistema)
2. [Dashboard](#dashboard)
3. [Gestione Richieste](#gestione-richieste)
4. [Gestione Utenti](#gestione-utenti)

## Accesso al Sistema

1. Apri il browser e naviga alla pagina di login del backoffice
2. Inserisci le tue credenziali:
   - Email
   - Password
3. Clicca su "Accedi"

## Dashboard

La dashboard fornisce una panoramica delle attività:
- Statistiche delle richieste 
- Lista delle ultime richieste ricevute
- Accesso rapido alle funzionalità principali

## Gestione Richieste

### Visualizzazione Richieste
- Tutte le richieste sono visualizzate in card 
- Ogni card mostra:
  - ID richiesta
  - Tipo (Prenotazione/Informazione)
  - Data creazione
  - Dati del richiedente
  - Stato attuale

Cliccando su "Mostra dettagli" si visualizzano informazioni aggiuntive in base al tipo di richiesta:

#### Per Informazioni:
- Testo completo della richiesta

#### Per Prenotazioni:
- Data inizio
- Data fine 
- Lista laboratori selezionati
- Tipologia (VISITA/SOGGIORNO)
- In base alla tipologia:
  - **VISITA**: Fascia oraria (MATTINA/POMERIGGIO)
  - **SOGGIORNO**: Numero giorni

### Filtri
È possibile filtrare le richieste per:
- Tipo (Prenotazioni/Informazioni/Tutti)
- Stato (Ricevute/In Carico/Confermate/Rifiutate/Archiviate)
- Data
- Email
- Organizzazione

### Gestione Stati
Per cambiare lo stato di una richiesta:
1. Seleziona il nuovo stato dal menu a tendina
2. Conferma il cambiamento

### Modifica Richieste
Per modificare una richiesta:
1. Clicca sul pulsante "Modifica"
2. Aggiorna i campi necessari
3. Salva le modifiche

### Eliminazione
Per eliminare una richiesta:
1. Clicca sul pulsante "Elimina"
2. Conferma l'eliminazione nel popup

## Gestione Utenti

### Visualizzazione Utenti
- Lista degli utenti del sistema
- Dettagli mostrati:
  - Email
  - Nome
  - Cognome
  - Ruolo

### Creazione Nuovo Utente
1. Clicca su "Nuovo Utente"
2. Compila i campi richiesti:
   - Email*
   - Nome*
   - Cognome*
   - Password*
   - Ruolo* (User/Admin)
3. Clicca su "Salva"

### Modifica Utente
1. Clicca sull'icona di modifica
2. Aggiorna i campi necessari
3. Salva le modifiche

### Eliminazione Utente
1. Clicca sull'icona di eliminazione
2. Conferma l'eliminazione

## Note
- I campi contrassegnati con * sono obbligatori
- Le modifiche sono immediate e vengono salvate nel database
- In caso di errori, viene mostrato un messaggio di feedback
- Per motivi di sicurezza, effettua sempre il logout alla fine della sessione

Per ulteriori dettagli tecnici consultare:
- [Documentazione Backend](../Progetto_backend/README.md)
- [Documentazione Frontend](../Progetto_frontend/README_FRONTEND.md)
- [Documentazione Backoffice](README.md)