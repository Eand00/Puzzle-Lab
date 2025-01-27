# Documentazione Backoffice - Caccia SAPERI

## Indice

1. Struttura del progetto
2. Informazioni generali
3. Scelte progettuali
    - Web Components
    - Services
    - Gestione autenticazione
    - API
    - Messaggi di feedback
    - Filtri
4. Note tecniche e sviluppi futuri

## Struttura del progetto

```
backoffice/
├── index.html                      # Dashboard
├── login.html                      # Login page
├── requests.html                   # Requests management
├── users.html                      # Users management
│
├── assets/
│   ├── css/
│   │   ├── style.css               # Global styles
│   │   ├── components/
│   │   │   ├── header.css          # Header component styles
│   │   │   └── toast.css           # Toast component styles
│   │   └── pages/
│   │       ├── index.css           # Dashboard specific styles
│   │       ├── login.css           # Login page styles
│   │       ├── requests.css        # Requests page styles
│   │       └── users.css           # Users page styles
│   │
│   └── js/
│       ├── config/
│       │   └── config.js           # Global configuration
│       │
│       ├── components/
│       │   ├── header-component.js # Navigation header
│       │   └── toast-component.js  # Feedback messages
│       │
│       ├── services/
│       │   ├── auth.service.js     # Authentication handling
│       │   ├── requests.service.js # Requests CRUD operations
│       │   └── users.service.js    # Users management
│       │
│       ├── utils/
│       │   ├── api-client.js       # Fetch wrapper
│       │   └── toast.util.js       # Toast utility
│       │   └── validators.js       # Form validations
│       │
│       └── pages/
│           ├── main.js             # Global logic
│           ├── index.main.js       # Dashboard logic
│           ├── login.main.js       # Login page logic
│           ├── requests.main.js    # Requests page logic
│           └── users.main.js       # Users page logic
│
└── README.md  
```

## Informazioni generali

Il backoffice è sviluppato in HTML, CSS e Javascript vanilla, senza dipendenze da framework esterni.
L'architettura è basata su Web Components per la modularità dell'interfaccia e su Services per la gestione della logica di business.

## Scelte progettuali

### Web Components

Si è scelto l'utilizzo dei Web Components per le parti di codice comuni, al fine di garantire:
- Modularità: approccio DRY per elementi riutilizzabili
- Manutenibilità: sviluppo indipendente dei componenti
- Organizzazione: logica centralizzata

#### Componenti utilizzati

- **header-component.js**
  Header e navigazione del backoffice
  - Gestione menu di navigazione
  - Gestione logout

- **toast-component.js**
  Sistema di notifiche
  - Feedback operazioni
  - Gestione errori

### Services

La logica di business è organizzata in services dedicati:

- **auth.service.js**
  Gestione autenticazione
  - Login/Logout
  - Gestione token JWT
  
- **requests.service.js**
  Gestione richieste prenotazione
  - Operazioni CRUD
  - Filtri e ricerche
  
- **users.service.js**
  Gestione utenti amministratori
  - Operazioni CRUD
  - Gestione permessi

### Autenticazione

L'autenticazione è implementata tramite JWT memorizzato in localStorage.
La responsabilità della gestione della logica di business di autenticazione è delegata al service auth.service.js, che incapsula interamente la gestione del token JWT, mantenendo in metodi privati l'accesso in scrittura al localStorage.

#### Auth Guard
Si è implementato un sistema di guardia a protezione delle pagine accessibili solo agli utenti autenticati. Il sistema è gestito lato client atttraverso un controllo sull'esistenza del token e una splash screen di caricamento per inibire la visione delle pagine durante il tempo di verifica dell'autenticazione.
A completamento, le richieste di dati via API richiedono l'autenticazione, pertanto non sono presenti sul client dati protetti, dunque la splash screen ha il solo scopo di proteggere la visualizzazione dell'interfaccia durante le operazioni di verifica.

NOTA: Questa è una soluzione valida unicamente per gli scopi di questo prototipo, ulteriori valutazioni sono presenti al capitolo "Sviluppi futuri".

### API

L'API è implementata tramite fetch.
La responsabilità della gestione della logica è delegata all'utility api-client.js.

### Messaggi di feedback

I messaggi di feedback sono implementati tramite il componente toast.
La responsabilità della gestione della logica è delegata all'utility toast.util.js.

## Note tecniche e sviluppi futuri

### Auth Guard
La soluzione presentata, valida in fase di presentazione del prototipo, andrà ristrutturata e resa più robusta in produzione, sostituendola con un approccio server-side.
