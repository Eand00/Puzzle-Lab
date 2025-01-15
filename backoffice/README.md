# Documentazione Backoffice - Caccia SAPERI

## Indice

1. Struttura del progetto
2. Informazioni generali
3. Scelte progettuali
    - Web Components
    - Services
    - Gestione autenticazione
4. Note tecniche per lo sviluppo

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
│       │   └── validators.js       # Form validations
│       │
│       └── pages/
│           ├── index.main.js       # Dashboard logic
│           ├── login.main.js       # Login page logic
│           ├── requests.main.js    # Requests page logic
│           └── users.main.js       # Users page logic
│
└── README.md  
```

## Informazioni generali

Il backoffice è sviluppato in HTML, CSS e Javascript vanilla, senza dipendenze da framework esterni. L'architettura è basata su Web Components per la modularità dell'interfaccia e su Services per la gestione della logica di business.

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
  - CRUD operazioni
  - Filtri e ricerche
  
- **users.service.js**
  Gestione utenti amministratori
  - CRUD operazioni
  - Gestione permessi

### Gestione autenticazione

L'autenticazione è implementata tramite JWT stored in localStorage. Ogni chiamata API viene automaticamente arricchita con il token di autenticazione tramite l'utility api-client.js.

<!-- XXX: note per lo sviluppo
- nel file config.js ci saranno gli endpoint delle API
- la pagina index.html l'ho pensata come dashboard, per esempio includendo un widget con il totale delle richieste arrivate, separato per stato e con le ultime richieste arrivate e non ancora elaborate. Ma è solo un'idea, al limite si può abolire e rinominare index la pagina requests
- la pagina requests.html è la principale, con la visualizzazione delle richieste e le funzionalità di gestione
- la pagina users.html è la pagina per la gestione degli utenti
-->