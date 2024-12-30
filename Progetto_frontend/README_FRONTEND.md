# Documentazione Frontend - Caccia SAPERI

## Indice

1. Struttura del progetto
2. Informazioni generali
3. Scelte progettuali
    - Menu mobile
    - Web Components
      - Componenti utilizzati
    - Validazione forms
      - Regole di validazione
      - Feedback all'utente
    - Template Laboratori

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

Si è scelto l'utilizzo dei Web Components per le parti di codice che si ripetono più volte nel sito, al fine di garantire e migliorare:
- Modularità: consente un approccio DRY per le parti comuni del sito
- Manutenibilità: si può sviluppare e modificare un componente in modo indipendente
- Organizzazione: la logica centralizzata rende più semplice la gestione del codice
- Progressive Enhancement: se JS è disabilitato dall'utente, un fallback permette l'usabilità del sito

**Nota**: I componenti attuali non utilizzano Shadow DOM, condividendo lo scope CSS globale dell'applicazione. Questo è una scelta progettuale intenzionale per mantenere la coerenza stilistica con il resto del sito, sfruttando il CSS già presente.

#### Componenti utilizzati

- header-components.js
  header e menu di navigazione del sito
- footer-components.js
  footer del sito
- lab-grid-component.js
  visualizzazione delle card dei laboratori
  Proprietà:
  - data-labs: array di oggetti con le proprietà title, image, href
- lab-card-component.js
  card di laboratorio
  Proprietà:
  - title: stringa
  - image: stringa
  - href: stringa

<!-- TODO:
### Gestione Javascript disabilitato

Per garantire una migliore esperienza utente, è stato implementato un sistema di fallback per la visualizzazione del sito quando il Javascript è disabilitato, utilizzando il tag `<noscript>` per i contenuti dinamici, quali i web components. Questo approccio consente di garantire una visualizzazione completa del sito anche in presenza di limitazioni imposte dall'utente. Inoltre, permette di mantenere un'indicizzazione completa del sito da parte dei motori di ricerca.

### Creazione altri componenti
- form-component.js
  centralizzazione della validazione lato client, dell'invio dati, della gestione feedback
- cta-component.js
  centralizzazione stile CTA
- faq-component.js
  centralizzazione stile FAQ
-->

### Validazione forms

La validazione lato client dei form è implementata secondo il principio di Progressive enhancement, con un controllo in JavaScript che si occupa di validare il valore degli input al blur sul singolo campo oltre che al submit del form, e un fallback per la validazione nativa HTML5.  
La validazione Javascript viene applicata selettivamente ai form che hanno l'attributo `data-validate`, evitando di applicarla anche a form che non ne necessitano.

#### Regole di validazione

Le regole di validazione sono centralizzate e dichiarate per ogni campo nell'oggetto `VALIDATION_RULES`, definito globalmente nel file `form-validation.js`. L'oggetto contiene, per ogni campo: 
- il pattern regex di validazione
- un flag `required` per indicare se il campo è obbligatorio
- un messaggio di errore

#### Feedback all'utente

Il feedback visivo è gestito tramite il file `form.css` che definisce gli stili per lo stato valid/invalid dei campi e dalla funzione `updateFieldStatus` che aggiorna lo stato del campo obbligatorio in base alla validità del valore inserito.
In fase di submit del form, in caso di campi non validi, il feedback include anche uno scroll e un focus verso il primo campo invalid, per migliorare l'esperienza utente.

### Template Laboratori

Si è scelto di realizzare pagine statiche per i laboratori, con un template base in `laboratori/_modello.html` e un file per ogni laboratorio in `laboratori/`. Tale scelta è stata fatta in ottica di ottimizzazione SEO dei contenuti; la presenza del template è utile al fine di mantenere la coerenza di presentazione in eventuali futuri aggiornamenti dei contenuti.
