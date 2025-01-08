# Puzzle Lab

# README: Installazione di XAMPP e Avvio di un File JAR con Java 17

## Requisiti
- **Sistema Operativo**: Windows, macOS o Linux
- **XAMPP**: Versione compatibile con il tuo sistema operativo
- **Java**: Versione 17
- **File JAR**: Assicurati che il file JAR sia disponibile e funzionante

---

## 1. Installazione di XAMPP

### Passo 1: Scaricare XAMPP
1. Visita il sito ufficiale di XAMPP: [https://www.apachefriends.org/index.html](https://www.apachefriends.org/index.html)
2. Seleziona la versione adatta al tuo sistema operativo.
3. Scarica il file di installazione.

### Passo 2: Installare XAMPP
1. Avvia il file di installazione scaricato.
2. Segui le istruzioni guidate:
   - Seleziona i componenti necessari (Apache, MySQL, ecc.).
   - Scegli la directory di installazione (di default: `C:\xampp` su Windows).
3. Completa l'installazione.

### Passo 3: Avviare XAMPP
1. Apri il pannello di controllo di XAMPP.
2. Avvia i servizi necessari:
   - **Apache**: per eseguire un server web.
   - **MySQL**: per il database.
3. Verifica il funzionamento:
   - Dovresti avere il pannello di controllo in questo modo:
   ![Screenshot del pannello di controllo XAMPP](img/pannelloXampp.png "XAMPP Control Panel")
4. Clicca su Admin tra le opzioni di MySQL:
   - Dovresti ottenere una pagina del genere:
   ![Screenshot della pagina database](img/paginaDatabase.png "XAMPP database")
5. Crea il database:
   - Clicca in alto a sinistra su nuovo.
   - metti come nome del database caccia_saperi in questo modo e poi clicca su crea:
   ![Screenshot della pagina creazione database](img/creazioneDatabase.png "XAMPP database")
---

## 2. Installazione di Java 17

### Passo 1: Scaricare Java 17
1. Vai al sito ufficiale di Oracle: [https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
2. Scarica il pacchetto Java Development Kit (JDK) 17 per il tuo sistema operativo.

### Passo 2: Installare Java 17
1. Avvia il file di installazione.
2. Segui le istruzioni guidate per completare l'installazione.
3. Verifica l'installazione:
   - Apri un terminale (o il prompt dei comandi su Windows).
   - Digita: `java -version`.
   - Dovresti vedere una versione simile a questa:
     ```
     java version "17.x.x"
     Java(TM) SE Runtime Environment (build 17.x.x)
     Java HotSpot(TM) 64-Bit Server VM (build ...)
     ```

---

## 3. Avvio del File JAR con Java 17

### Passo 1: Preparazione
1. Assicurati che il file JAR sia nella directory desiderata.
2. Verifica che il file JAR sia eseguibile (ad esempio, creato correttamente con un punto di ingresso definito).

### Passo 2: Eseguire il File JAR
1. Apri un terminale (o prompt dei comandi su Windows).
2. Spostati nella directory contenente il file JAR usando il comando `cd`. Ad esempio:
   ```bash
   cd C:\percorso\alla\cartella
   ```
3. Esegui il file JAR con il comando:
   ```bash
   java -jar nomefile.jar
   ```
   Sostituisci `nomefile.jar` con il nome effettivo del tuo file.
4. Dopo aver avviato il jar per andare su swagger vai all'indirizzo:[http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)  


