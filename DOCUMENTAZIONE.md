# 📘 Documentazione Completa del Progetto Spring Boot - Puzzle Lab

## Indice
1. [Introduzione](#introduzione)
2. [Requisiti](#requisiti)
3. [Struttura del Progetto](#struttura-del-progetto)
4. [Configurazione](#configurazione-del-progetto)
5. [Dettagli sui Servizi](#dettagli-sui-servizi)
6. [Endpoint REST](#endpoint-rest)
7. [Documentazione Database](#database)


---

## Introduzione
**Progetto_backend** è un'applicazione Spring Boot progettata per la gestione di autenticazione utenti, prenotazioni/richieste informazioni da parte di clienti e invio di email.

# Documentazione Tecnologie Usate nel Progetto Backend

## Tecnologie Principali

### 1. **Spring Boot**
   - **Versione**: 3.4.0
   - **Descrizione**: Spring Boot è un framework Java che semplifica la configurazione e la distribuzione delle applicazioni. Viene utilizzato per costruire applicazioni stand-alone, di produzione e basate su microservizi.
   - **Dipendenze**:
     - `spring-boot-starter-data-jpa`: Per la gestione della persistenza dei dati usando JPA (Java Persistence API).
     - `spring-boot-starter-mail`: Fornisce il supporto per l'invio di email tramite JavaMail.
     - `spring-boot-starter-web`: Fornisce il supporto per la creazione di applicazioni web con RESTful API.
     - `spring-boot-devtools`: Strumenti per migliorare l'esperienza di sviluppo, tra cui il riavvio automatico dell'applicazione.
     - `spring-boot-starter-test`: Fornisce gli strumenti per testare l'applicazione, incluse librerie come JUnit.
     - `spring-boot-starter-security`: Per gestire l'autenticazione e l'autorizzazione degli utenti.

### 2. **Spring Security**
   - **Descrizione**: Una potente libreria per gestire la sicurezza in un'applicazione, tra cui autenticazione, autorizzazione e protezione dalle vulnerabilità più comuni (ad esempio, CSRF, XSS).
   - **Dipendenze**:
     - `spring-security-core`: Fornisce le funzionalità di base di sicurezza.
     - `spring-security-test`: Strumenti per il testing delle funzionalità di sicurezza nell'applicazione.

### 3. **Springdoc OpenAPI (Swagger)**
   - **Versione**: 2.7.0
   - **Descrizione**: Springdoc OpenAPI è un'implementazione per generare la documentazione interattiva delle API utilizzando **Swagger**. Questo strumento è utile per visualizzare e testare le API RESTful in modo dinamico e interattivo tramite una UI web. 
     La libreria integra automaticamente **Swagger UI** nella tua applicazione per esplorare e interagire con le API.
   - **Dipendenza**: `springdoc-openapi-starter-webmvc-ui`
   - **Come Funziona**: Quando il progetto viene eseguito, è possibile accedere a una UI interattiva di Swagger tramite un endpoint, di solito disponibile all'indirizzo `/swagger-ui.html`. Da lì, puoi vedere tutte le tue API, leggere le loro descrizioni e provarle direttamente.

### 4. **Lombok**
   - **Descrizione**: Una libreria che riduce il boilerplate di codice in Java, aggiungendo annotazioni per generare automaticamente getter, setter, costruttori, metodi `toString()`, `equals()`, `hashCode()`, e altro.
   - **Dipendenza**: `lombok`

### 5. **MySQL**
   - **Descrizione**: Database relazionale open-source che viene utilizzato come sistema di gestione dei dati.
   - **Dipendenza**: `mysql-connector-j`

### 6. **JWT (JSON Web Token)**
   - **Versione**: 0.12.6
   - **Descrizione**: Un sistema di token di sicurezza basato su JSON che viene usato per la gestione dell'autenticazione e dell'autorizzazione nelle applicazioni web.
   - **Dipendenze**:
     - `jjwt-api`
     - `jjwt-impl`
     - `jjwt-jackson`

### 7. **Java 17**
   - **Versione**: 17
   - **Descrizione**: La versione di Java utilizzata per il progetto, che è la LTS (Long Term Support) più recente.

## Plugin

### 1. **Spring Boot Maven Plugin**
   - **Descrizione**: Plugin per Maven che consente di creare e distribuire applicazioni Spring Boot, con una configurazione predefinita per eseguire l'applicazione.
   - **Configurazione**:
     - **Exclude Lombok**: Il plugin esclude la dipendenza `lombok` durante la fase di creazione dell'applicazione.

---

## Requisiti
Per eseguire il progetto, è necessario disporre di:
- **Java 17** o superiore
- **Maven**
- **Database** (MySQL)

---

## Struttura del Progetto

### **1. Package `config`**
| Classe                | Descrizione                                                            |
| --------------------- | ---------------------------------------------------------------------- |
| `CorsConfig.java`     | Configura le regole CORS per consentire richieste da domini specifici. |
| `EmailConfig.java`    | Configurazione SMTP per l'invio di email.                              |
| `JWTFilter.java`      | Filtro per la gestione dei token JWT.                                  |
| `SecurityConfig.java` | Configura Spring Security per l'autenticazione e autorizzazione.       |
| `SwaggerConfig.java`  | Configura Swagger per generare la documentazione delle API REST.       |

### **2. Package `controllers`**
| Classe                      | Descrizione                                                                                  |
| --------------------------- | -------------------------------------------------------------------------------------------- |
| `AuthController.java`       | Gestisce il login e la registrazione degli utenti di backoffice.                             |
| `BackofficeController.java` | Fornisce endpoint per le operazioni amministrative.                                          |
| `EmailController.java`      | Permette l'invio di email tramite API REST.                                                  |
| `RichiestaController.java`  | Gestisce le richieste utente, come la creazione di prenotazioni o di richieste informazioni. |

### **3. Package `entities`**
| Classe               | Descrizione                                                                   |
| -------------------- | ----------------------------------------------------------------------------- |
| `EmailTemplate.java` | Modello per la gestione di email personalizzate.                              |
| `FasciaOraria.java`  | Rappresenta una fascia oraria.                                                |
| `Informazione.java`  | Modello per le richieste informazioni utente.                                 |
| `Laboratori.java`    | Rappresenta un laboratorio o risorsa prenotabile.                             |
| `Prenotazione.java`  | Modello per le prenotazioni utente.                                           |
| `Richiesta.java`     | Gestisce le richieste inviate dagli utenti.                                   |
| `Status.java`        | Enum per rappresentare stati di una richiesta (es. ricevuto/preso in carico). |
| `Tipologia.java`     | Enum per rappresentare tipi di prenotazione.                                  |
| `Utente.java`        | Rappresenta gli utenti del backoffice.                                        |

### **4. Package `repos`**
| Classe                 | Descrizione                                         |
| ---------------------- | --------------------------------------------------- |
| `EmailDAO.java`        | Repository per accedere ai dati di `EmailTemplate`. |
| `InformazioneDAO.java` | Repository per accedere ai dati di `Informazione`.  |
| `PrenotazioneDAO.java` | Repository per accedere ai dati di `Prenotazione`.  |
| `RichiestaDAO.java`    | Repository per accedere ai dati di `Richiesta`.     |
| `UtenteDAO.java`       | Repository per accedere ai dati di `Utente`.        |

### **5. Package `services`**
| Classe                            | Descrizione                                                                    |
| --------------------------------- | ------------------------------------------------------------------------------ |
| `CustomUserDetailsService.java`   | Gestisce il caricamento degli utenti per l'autenticazione con Spring Security. |
| `EmailService.java`               | Logica per l'invio di email tramite configurazione SMTP.                       |
| `InformazioneService.java`        | Logica per la gestione delle informazioni di sistema.                          |
| `JWTService.java`                 | Genera e valida i token JWT.                                                   |
| `PianificatoreCancellazione.java` | Automatizza la cancellazione di entità scadute.                                |
| `PrenotazioneService.java`        | Logica per la gestione delle prenotazioni.                                     |
| `RichiestaService.java`           | Logica per la gestione delle richieste utenti.                                 |
| `UtenteService.java`              | Logica per la gestione degli utenti, incluse registrazione e aggiornamento.    |

---

## Configurazione del progetto
### application.properties

## 1. **Nome dell'Applicazione**

- **Proprietà**: `spring.application.name`
- **Valore**: `Progetto_backend`
- **Descrizione**: Definisce il nome dell'applicazione Spring Boot. Utilizzato per identificare il progetto nei log e in altre configurazioni interne.

## 2. **Connessione al Database MySQL**

### 2.1. **URL del Database**

- **Proprietà**: `spring.datasource.url`
- **Valore**: `jdbc:mysql://localhost:3306/caccia_saperi`
- **Descrizione**: URL di connessione al database MySQL. Il database `caccia_saperi` si trova su `localhost` alla porta `3306`.

### 2.2. **Credenziali di Accesso**

- **Proprietà**: `spring.datasource.username`
- **Valore**: `root`
- **Descrizione**: Nome utente utilizzato per connettersi al database MySQL.
  
- **Proprietà**: `spring.datasource.password`
- **Valore**: *(vuoto)*
- **Descrizione**: Password per l'utente MySQL. Al momento non configurata.

### 2.3. **Driver JDBC**

- **Proprietà**: `spring.datasource.driver-class-name`
- **Valore**: `com.mysql.cj.jdbc.Driver`
- **Descrizione**: Specifica il driver JDBC per MySQL, necessario per la connessione al database.

## 3. **Configurazione di Hibernate (JPA)**

### 3.1. **Dialect di Hibernate**

- **Proprietà**: `spring.jpa.database-platform`
- **Valore**: `org.hibernate.dialect.MySQLDialect`
- **Descrizione**: Configura Hibernate per utilizzare il dialetto SQL compatibile con MySQL, ottimizzando le query generate.

### 3.2. **Gestione dello Schema del Database**

- **Proprietà**: `spring.jpa.hibernate.ddl-auto`
- **Valore**: `update`
- **Descrizione**: Imposta Hibernate per aggiornare automaticamente lo schema del database senza perdere i dati esistenti. Le opzioni includono `create`, `create-drop`, `validate`.

### 3.3. **Visualizzazione delle Query SQL**

- **Proprietà**: `spring.jpa.show-sql`
- **Valore**: `true`
- **Descrizione**: Abilita la stampa delle query SQL generate da Hibernate nei log. Utile per il debugging e l'analisi delle operazioni sul database.

## 4. **Inizializzazione del Database**

- **Proprietà**: `spring.sql.init.mode`
- **Valore**: `always`
- **Descrizione**: Esegue gli script di inizializzazione del database ogni volta che l'applicazione viene avviata, anche se il database esiste già. Altre opzioni includono `never` o `embedded`.

---

Questa configurazione stabilisce come l'applicazione Spring Boot interagisce con il database MySQL, gestisce lo schema tramite Hibernate e mostra le query per il monitoraggio. Le impostazioni possono essere personalizzate a seconda delle necessità del progetto.

## Dettagli sui Servizi
# Documentazione dei Service 

## Introduzione
Questi servizi sono componenti chiave di un'applicazione Spring Boot e sono responsabili della gestione della logica applicativa. Ciascun servizio ha un ruolo specifico e utilizza repository o altre dipendenze per eseguire le operazioni necessarie.

---

## **1. CustomUserDetailsService**

- **Descrizione**: Implementa l'interfaccia `UserDetailsService` di Spring Security per la gestione dell'autenticazione e dei dettagli dell'utente.
- **Responsabilità**:
  - Caricare un utente dal database in base al nome utente o email.
  - Convertire i dati dell'utente in un'implementazione di `UserDetails` utilizzata da Spring Security.
- **Principali Metodi**:
  - `loadUserByUsername(String username)`: Recupera i dati di un utente dal database per l'autenticazione.

---

## **2. EmailService**

- **Descrizione**: Responsabile dell'invio delle email dall'applicazione.
- **Responsabilità**:
  - Configurare e inviare email utilizzando il supporto Spring per `JavaMailSender`.
  - Personalizzare i contenuti delle email, ad esempio messaggi di conferma o notifiche.

---

## **3. InformazioneService**

- **Descrizione**: Si occupa della gestione delle richieste di informazioni inviate dagli utenti.
- **Responsabilità**:
  - Recuperare, aggiornare o manipolare dati generali dell'applicazione o relativi a informazioni specifiche.
  - Interagire con i repository per leggere o scrivere informazioni nel database.


---

## **4. JWTService**

- **Descrizione**: Fornisce funzionalità per la generazione, validazione e parsing di token JWT.
- **Responsabilità**:
  - Creare token JWT utilizzando informazioni come username.
  - Validare i token JWT ricevuti nelle richieste.
  - Estrarre dati dai token JWT, come il nome utente 

## **5. PianificatoreCancellazione**

- **Descrizione**: Automatizza la cancellazione di utenti e richieste scaduti.
- **Responsabilità**:
  - Schedulare l'eliminazione di dati obsoleti dal database.
  - Utilizzare annotazioni come `@Scheduled` per eseguire operazioni periodiche.

---

## **6. PrenotazioneService**

- **Descrizione**: Si occupa della gestione delle richieste di prenotazioni inviate dagli utenti.
- **Responsabilità**:
  - Creare, aggiornare e cancellare prenotazioni.
  - Fornire dettagli su prenotazioni esistenti.

---

## **7. RichiestaService**

- **Descrizione**: Si occupa della gestione delle richieste inviate dagli utenti.
- **Responsabilità**:
  - Creare e aggiornare richieste inviate dagli utenti per risorse, informazioni o servizi.
  - Gestire stati delle richieste.
  - Filtrare e recuperare richieste specifiche.

---

## **8. UtenteService**

- **Descrizione**: Gestisce la logica applicativa relativa agli utenti.
- **Responsabilità**:
  - Creare, aggiornare ed eliminare utenti nel sistema.
  - Fornire funzionalità per la gestione del profilo utente e della sicurezza.
  - Interagire con il database per recuperare informazioni sugli utenti.
---

## Conclusione

Questi servizi costituiscono il cuore della logica applicativa, separando le responsabilità e garantendo un'architettura ben strutturata. Ogni servizio può essere testato e mantenuto separatamente, facilitando lo sviluppo e la scalabilità dell'applicazione.


---

## Endpoint REST
Ecco i principali endpoint REST disponibili:

### **Autenticazione (`AuthController`)**

| Metodo | Endpoint | Descrizione                                  | Autenticazione |
| ------ | -------- | -------------------------------------------- | -------------- |
| POST   | `/login` | Effettua il login e restituisce un token JWT | No             |

---

#### **POST /login**

- **Descrizione**: Effettua l'autenticazione di un utente utilizzando credenziali fornite nell'header `Authorization` in formato Basic Authentication e restituisce un token JWT.
  
- **Parametri**:
  - **Authorization (Header)**: Necessario. Contiene le credenziali codificate in Base64 nel formato `Basic <username:password>`.

- **Flusso**:
  1. Il client invia una richiesta POST con l'header `Authorization` contenente le credenziali codificate in Base64.
  2. Il server valida l'header, autentica l'utente tramite `AuthenticationManager`, e genera un token JWT tramite `JWTService`.
  3. In caso di successo, viene restituito il token JWT. In caso di errore, viene restituito il codice di errore appropriato.



### **Backoffice (`Backoffice Controller`)**


Il **BackofficeController** gestisce le operazioni CRUD e le richieste specifiche relative a richieste, informazioni, prenotazioni e utenti.


Il **BackofficeController** gestisce le operazioni CRUD e le richieste specifiche relative a richieste, informazioni, prenotazioni e utenti.

## Tabella degli Endpoint

| Categoria        | Metodo   | Endpoint                                | Descrizione                                                      | Parametri / Body                         | Risposte                             |
| ---------------- | -------- | --------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------- | ------------------------------------ |
| **Richieste**    | `GET`    | `/back-office/richieste`                | Recupera tutte le richieste non archiviate.                      | Nessuno                                  | `200`: Successo<br>`500`: Errore     |
|                  | `GET`    | `/back-office/richieste/tutte`          | Recupera tutte le richieste, incluse quelle archiviate.          | Nessuno                                  | `200`: Successo<br>`500`: Errore     |
|                  | `GET`    | `/back-office/richieste/archivio`       | Recupera tutte le richieste archiviate.                          | Nessuno                                  | `200`: Successo<br>`500`: Errore     |
|                  | `GET`    | `/back-office/richieste/status`         | Recupera tutte le richieste con un determinato status.           | `status` (opzionale)                     | `200`: Successo<br>`500`: Errore     |
|                  | `GET`    | `/back-office/richieste/nome`           | Recupera richieste che contengono il parametro `nome`.           | `nome` (opzionale)                       | `200`: Successo<br>`500`: Errore     |
|                  | `GET`    | `/back-office/richieste/cognome`        | Recupera richieste che contengono il parametro `cognome`.        | `cognome` (opzionale)                    | `200`: Successo<br>`500`: Errore     |
|                  | `GET`    | `/back-office/richieste/email`          | Recupera richieste che contengono il parametro `email`.          | `email` (opzionale)                      | `200`: Successo<br>`500`: Errore     |
|                  | `GET`    | `/back-office/richieste/organizzazione` | Recupera richieste che contengono il parametro `organizzazione`. | `organizzazione` (opzionale)             | `200`: Successo<br>`500`: Errore     |
|                  | `GET`    | `/back-office/richieste/data`           | Recupera richieste create in una specifica data.                 | `data` (opzionale, formato `YYYY-MM-DD`) | `200`: Successo<br>`500`: Errore     |
|                  | `DELETE` | `/back-office/richieste`                | Imposta una richiesta come cancellata.                           | `id`: ID della richiesta                 | `202`: Successo<br>`400`: Non valida |
| **Informazioni** | `GET`    | `/back-office/informazioni`             | Recupera tutte le informazioni non archiviate.                   | Nessuno                                  | `200`: Successo<br>`500`: Errore     |
|                  | `GET`    | `/back-office/informazioni/tutte`       | Recupera tutte le informazioni.                                  | Nessuno                                  | `200`: Successo<br>`500`: Errore     |
|                  | `GET`    | `/back-office/informazioni/archivio`    | Recupera tutte le informazioni archiviate.                       | Nessuno                                  | `200`: Successo<br>`500`: Errore     |
|                  | `PUT`    | `/back-office/informazioni`             | Aggiorna un'informazione specifica.                              | `Informazione`: Oggetto JSON             | `202`: Successo<br>`400`: Non valida |
| **Prenotazioni** | `GET`    | `/back-office/prenotazioni`             | Recupera tutte le prenotazioni non archiviate.                   | Nessuno                                  | `200`: Successo<br>`500`: Errore     |
|                  | `GET`    | `/back-office/prenotazioni/tutte`       | Recupera tutte le prenotazioni.                                  | Nessuno                                  | `200`: Successo<br>`500`: Errore     |
|                  | `GET`    | `/back-office/prenotazioni/archivio`    | Recupera tutte le prenotazioni archiviate.                       | Nessuno                                  | `200`: Successo<br>`500`: Errore     |
|                  | `PUT`    | `/back-office/prenotazioni`             | Aggiorna una prenotazione specifica.                             | `Prenotazione`: Oggetto JSON             | `202`: Successo<br>`400`: Non valida |
| **Utenti**       | `POST`   | `/back-office/utente`                   | Crea un nuovo utente.                                            | `Utente`: Oggetto JSON                   | `201`: Successo<br>`400`: Non valida |
|                  | `PUT`    | `/back-office/utente`                   | Aggiorna i dati di un utente esistente.                          | `Utente`: Oggetto JSON                   | `202`: Successo<br>`400`: Non valida |
|                  | `DELETE` | `/back-office/utente`                   | Elimina logicamente un utente.                                   | `email`: Email dell'utente               | `202`: Successo<br>`400`: Non valida |
|                  | `GET`    | `/back-office/utenti`                   | Recupera tutti gli utenti.                                       | Nessuno                                  | `200`: Successo<br>`500`: Errore     |
|                  | `GET`    | `/back-office/utente/{email}`           | Recupera un utente in base all'email.                            | `email`: Email dell'utente               | `200`: Successo<br>`500`: Errore     |

### **Email (`EmailController`)**

# EmailController

Il **EmailController** gestisce l'invio delle email in risposta a una richiesta. Utilizza il servizio `EmailService` per inviare le email.

## Endpoint

### `GET /sendEmail`

Invia un'email basata su una richiesta.

- **Descrizione**: Questo endpoint riceve una richiesta e invia un'email associata utilizzando il servizio `EmailService`. Se l'email viene inviata con successo, viene restituito un messaggio di conferma. In caso di errore durante l'invio, viene restituito un messaggio di errore con il dettaglio dell'eccezione.
  
- **Metodo HTTP**: `GET`

- **URL**: `/sendEmail`

- **Parametri**:
  - **Body**: Una richiesta (`Richiesta`) che contiene i dettagli dell'email da inviare. Il corpo della richiesta deve essere un oggetto JSON che rappresenta una `Richiesta`. Il formato esatto dipende dalla struttura della classe `Richiesta`.

- **Risposte**:
  - `200 OK`: Se l'email è stata inviata con successo, viene restituito un messaggio di conferma: `Email inviata con successo!`.
  - `500 Internal Server Error`: Se si verifica un errore durante l'invio dell'email, viene restituito un messaggio di errore contenente i dettagli dell'eccezione, ad esempio: `Errore durante l'invio dell'email: <messaggio dell'eccezione>`.

### **Richiesta (`RichiestaController`)**

# RichiestaController

Il **RichiestaController** gestisce la creazione di richieste di informazioni e prenotazioni, e invia notifiche via email utilizzando il servizio `EmailService`.

## Endpoint

### `POST /richieste/informazioni`

Crea e salva una nuova informazione e invia una email di notifica.

- **Descrizione**: Questo endpoint riceve una nuova informazione, la salva utilizzando il servizio `InformazioneService` e invia una email tramite `EmailService` per notificare la creazione dell'informazione. Se la creazione è riuscita, viene restituito un messaggio di conferma. In caso di errore, viene restituito un messaggio di errore.

- **Metodo HTTP**: `POST`

- **URL**: `/richieste/informazioni`

- **Parametri**:
  - **Body**: Un oggetto `Informazione` che rappresenta la richiesta di informazione. Il corpo della richiesta deve essere un oggetto JSON che contiene i dettagli dell'informazione da salvare.

- **Risposte**:
  - `201 Created`: Se l'informazione è stata creata con successo, viene restituito un messaggio di conferma: `Informazione creata con successo.`
  - `400 Bad Request`: Se c'è un errore nella richiesta (ad esempio, parametri non validi), viene restituito un messaggio di errore con il dettaglio dell'eccezione.

### `POST /richieste/prenotazioni`

Crea e salva una nuova prenotazione e invia una email di notifica.

- **Descrizione**: Questo endpoint riceve una nuova prenotazione, la salva utilizzando il servizio `PrenotazioneService` e invia una email tramite `EmailService` per notificare la creazione della prenotazione. Se la creazione è riuscita, viene restituito un messaggio di conferma. In caso di errore, viene restituito un messaggio di errore.

- **Metodo HTTP**: `POST`

- **URL**: `/richieste/prenotazioni`

- **Parametri**:
  - **Body**: Un oggetto `Prenotazione` che rappresenta la prenotazione da creare. Il corpo della richiesta deve essere un oggetto JSON che contiene i dettagli della prenotazione.

- **Risposte**:
  - `201 Created`: Se la prenotazione è stata creata con successo, viene restituito un messaggio di conferma: `Prenotazione creata con successo.`
  - `400 Bad Request`: Se c'è un errore nella richiesta (ad esempio, parametri non validi), viene restituito un messaggio di errore con il dettaglio dell'eccezione.




---


## Database 

Il database `caccia_saperi` contiene diverse tabelle che supportano la gestione di email, richieste informazioni, prenotazioni, utenti e altre funzionalità correlate. Di seguito, è descritta la struttura principale delle tabelle più rilevanti e i loro scopi:

### Tabella `email-template`
| Campo             | Tipo      | Descrizione                                          |
| ----------------- | --------- | ---------------------------------------------------- |
| `id`              | `BigInt`  | Identificativo univoco del template                  |
| `corpo`           | `Text`    | Contenuto HTML del messaggio email                   |
| `encryption_type` | `Enum`    | Tipo di crittografia (NONE, SSL, TLS)                |
| `host`            | `Varchar` | Server SMTP per l'invio dell'email                   |
| `oggetto`         | `Varchar` | Oggetto dell'email                                   |
| `password`        | `Varchar` | Password per l'autenticazione SMTP                   |
| `port`            | `Int`     | Porta del server SMTP                                |
| `usato`           | `Bit`     | Flag che indica se il template è in uso (1) o no (0) |
| `username`        | `Varchar` | Username per l'autenticazione SMTP                   |

---

### Tabella `informazioni`
| Campo   | Tipo     | Descrizione            |
| ------- | -------- | ---------------------- |
| `id`    | `BigInt` | Identificativo univoco |
| `testo` | `Text`   | Testo informativo      |

---

### Tabella `prenotazioni`
| Campo         | Tipo       | Descrizione                                   |
| ------------- | ---------- | --------------------------------------------- |
| `id`          | `BigInt`   | Identificativo univoco                        |
| `data_inizio` | `Datetime` | Data e ora di inizio prenotazione             |
| `data_fine`   | `Datetime` | Data e ora di fine prenotazione               |
| `testo`       | `Text`     | Descrizione o informazioni sulla prenotazione |

---

### Tabella `richieste`
| Campo                         | Tipo       | Descrizione                                                                          |
| ----------------------------- | ---------- | ------------------------------------------------------------------------------------ |
| `id`                          | `BigInt`   | Identificativo univoco                                                               |
| `cancellato`                  | `Bit`      | Indica se la richiesta è stata cancellata (1) o no (0)                               |
| `cognome`                     | `Varchar`  | Cognome dell'utente                                                                  |
| `data_creazione`              | `Datetime` | Data e ora di creazione della richiesta                                              |
| `data_prevista_cancellazione` | `Datetime` | Data di cancellazione prevista, se applicabile                                       |
| `email`                       | `Varchar`  | Indirizzo email dell'utente                                                          |
| `nome`                        | `Varchar`  | Nome dell'utente                                                                     |
| `numero`                      | `Varchar`  | Numero di telefono dell'utente                                                       |
| `organizzazione`              | `Varchar`  | Nome dell'organizzazione dell'utente                                                 |
| `status`                      | `Enum`     | Stato della richiesta (ARCHIVIATA, CONFERMATA, PRESA_IN_CARICO, RICEVUTA, RIFIUTATA) |

---

### Tabella `utenti`
| Campo                         | Tipo       | Descrizione                                        |
| ----------------------------- | ---------- | -------------------------------------------------- |
| `email`                       | `Varchar`  | Indirizzo email dell'utente (chiave primaria)      |
| `cognome`                     | `Varchar`  | Cognome dell'utente                                |
| `nome`                        | `Varchar`  | Nome dell'utente                                   |
| `password`                    | `Varchar`  | Hash della password dell'utente                    |
| `ruolo`                       | `Varchar`  | Ruolo assegnato all'utente (USER, ADMIN, ecc.)     |
| `cancellato`                  | `Bit`      | Indica se l'utente è stato cancellato (1) o no (0) |
| `data_prevista_cancellazione` | `Datetime` | Data di cancellazione prevista, se applicabile     |

--- 




