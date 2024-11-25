# Frontend

## Struttura del progetto

- index.html
- assets/
    - images/
        - favicon.ico
    - styles/
        - style.css
    - scripts/
        - script.js


## Informazioni generali

Il portale è sviluppato in HTML, CSS e Javascript, con l'utilizzo della libreria CSS Bootstrap.

## Ottimizzazioni

### Bootstrap
Si è scelto di utilizzare Bootstrap mediante CDN per aumentare le performance di caricamento della risorsa, in particolare per:
- caching: questa libreria è molto utilizzata ed è molto probabile sia già nella cache del browser dell'utente;
- distribuzione geografica: il CDN permette di fornire la risorsa dal server più vicino all'utente;
- riduzione del carico sul server: utilizzare un CDN toglie la risorsa dall'elenco degli asset statici che il server dovrà fornire all'utente.