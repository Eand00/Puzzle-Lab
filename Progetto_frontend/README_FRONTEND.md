# Documentazione Frontend - Caccia SAPERI

## Indice

1. Struttura del progetto
2. Informazioni generali
3. Scelte progettuali
    - Menu mobile
    - Web Components
    - Gestione Javascript disabilitato

## Struttura del progetto

- index.html
- components/
    - header-components.js
    - footer-components.js
- assets/
    - images/
        - favicon.ico
    - styles/
        - style.css
    - scripts/
        - script.js


## Informazioni generali

Il portale è sviluppato in HTML, CSS e Javascript, con l'utilizzo della libreria CSS Bootstrap.

## Scelte progettuali

### Menu mobile

Su dispositivi mobili, si è optato per un menu a comparsa laterale attivabile da un pulsante hamburger.
Per una migliore UX, la chiusura del menu è attivabile sia cliccando nuovamente sul pulsante, sia cliccando al di fuori del menu.

### Web Components

L'utilizzo dei Web Components per l'header e il footer nel sito frontend offre diversi vantaggi: consente di creare componenti riutilizzabili e modulari, migliorando la manutenibilità del codice; ogni componente può essere sviluppato, testato e aggiornato in modo indipendente, riducendo il rischio di introdurre errori nel resto del codice; i Web Components permettono di incapsulare lo stile e il comportamento, evitando conflitti con altri elementi della pagina. Questo approccio facilita anche la collaborazione tra i membri del team, poiché ogni sviluppatore può concentrarsi su specifici componenti senza interferire con il lavoro degli altri.

<!-- TODO:
### Gestione Javascript disabilitato

Per garantire una migliore esperienza utente, è stato implementato un sistema di fallback per la visualizzazione del sito quando il Javascript è disabilitato, utilizzando il tag `<noscript>` per i contenuti dinamici, quali i web components. Questo approccio consente di garantire una visualizzazione completa del sito anche in presenza di limitazioni imposte dall'utente. Inoltre, permette di mantenere un'indicizzazione completa del sito da parte dei motori di ricerca.
-->