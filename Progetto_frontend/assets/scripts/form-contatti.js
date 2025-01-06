const VALIDATION_RULES = {
  nome: {
    regex: /^[A-zÀ-ù'\s]+$/,
    message: "Il campo deve contenere solo lettere, apostrofi e spazi",
    required: true,
  },
  cognome: {
    regex: /^[A-zÀ-ù'\s]+$/,
    message: "Il campo deve contenere solo lettere, apostrofi e spazi",
    required: true,
  },
  organizzazione: {
    regex: /.+/,
    message: "Il campo non può essere vuoto",
    required: true,
  },
  email: {
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Il campo deve contenere un indirizzo email valido",
    required: true,
  },
  telefono: {
    regex: /^[\+]?[0-9\s]{10,}$/,
    message: "Il campo deve contenere un numero di telefono valido",
    required: false,
  },
  messaggio: {
    regex: /.+/,
    message: "Il campo non può essere vuoto",
    required: false,
  },
  privacy: {
    regex: "checked",
    message: "Il campo deve essere selezionato",
    required: true,
  },
  "sensible-data": {
    regex: "checked",
    message: "Il campo deve essere selezionato",
    required: true,
  },
  tos: {
    regex: "checked",
    message: "Il campo deve essere selezionato",
    required: true,
  },
};

// Descrizione: Restituisce il valore di un campo, considerando
// il tipo del campo (testo o checkbox).

// Parametri:

// field (HTMLInputElement): Il campo di cui ottenere il valore.
// Ritorno:

// (string | boolean): Il valore del campo o lo stato di selezione
// (per i checkbox).
function getFieldValue(field) {
  return field.type === "checkbox" ? field.checked : field.value;
}

// Descrizione: Aggiunge elementi span accanto ai campi
// del form per mostrare i messaggi di errore.

// Parametri:

// form (HTMLFormElement): Il form da inizializzare
function initErrorMessages(form) {
  form.querySelectorAll("input, textarea").forEach((input) => {
    const errorMessage = document.createElement("span");
    errorMessage.classList.add("error-message");
    input.parentNode.appendChild(errorMessage);
  });
}

// Descrizione: Valida il valore di un campo in base
// alle regole definite nell'oggetto VALIDATION_RULES.
// Questo processo verifica:

// Se il campo è obbligatorio e il valore è presente.
// Se il valore corrisponde all'espressione regolare
// specificata per il tipo.
// Se la validazione fallisce, restituisce il messaggio
// di errore associato.
// Parametri:

// data (string): Il valore del campo da validare.
// type (string): Il nome del campo, che corrisponde
// a una chiave in VALIDATION_RULES.
// Ritorno:

// [boolean, string]: Un array con:
// boolean: true se la validazione ha successo,
// altrimenti false.
// string: Un messaggio di errore se la validazione
// fallisce.
// Dettagli Operativi:

// Recupera le regole di validazione per il tipo
// specificato dall'oggetto VALIDATION_RULES.
// Controlla se il campo è obbligatorio (required) e
// se il dato è vuoto. Se sì, restituisce un errore
// immediato.
// Verifica il dato contro l'espressione regolare (regex).
// Se una delle verifiche fallisce, restituisce false
// e il messaggio di errore; altrimenti, true e una
// stringa vuota.
function validate(data, type) {
  const rule = VALIDATION_RULES[type];

  //checkboxes
  if (["privacy", "sensible-data", "tos"].includes(type)) {
    return [data === "on" || data === true, "Campo obbligatorio"];
  }

  //not recognized fields
  if (!rule) {
    return [false, "Campo non riconosciuto"];
  }

  //not required fields
  if (!rule.required) {
    return [true, ""];
  }

  return [rule.regex.test(data), rule.message];
}

// Descrizione: Aggiorna lo stato visivo di un campo
// in base al risultato della validazione. Se il campo
// non è valido, aggiunge una classe CSS per evidenziare
// l'errore e mostra il messaggio corrispondente.

// Parametri:

// field (string): L'ID del campo da aggiornare.
// isValid (boolean): Indica se il campo è valido.
// message (string): Il messaggio di errore da mostrare
// in caso di validazione fallita.
function updateFieldStatus(field, isValid, message) {
  const fieldElement = document.getElementById(field);

  //update the field status
  fieldElement.classList.toggle("invalid", !isValid);
  fieldElement.classList.toggle("valid", isValid);

  //update the error message
  fieldElement.parentNode.querySelector(".error-message").textContent = message;
}

function formValidation(form) {
  const errors = {};
  let isValid = true;
  form.querySelectorAll("input, textarea").forEach((input) => {
    if (input.required) {
      //get the value of the field OR the checkbox status
      let value = getFieldValue(input);
      const [fieldValid, message] = validate(value, input.name);

      //UI feedback
      updateFieldStatus(input.name, fieldValid, message);

      //Errors update
      if (!fieldValid) {
        errors[input.name] = message;
        isValid = false;
      }
    }
  });

  //error handling
  if (Object.keys(errors).length > 0) {
    //Smooth scroll to the first invalid field
    const invalidFields = form.querySelector(".invalid");
    invalidFields.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    });

    //focus the first invalid field
    setTimeout(() => invalidFields.focus(), 500);

    return false;
  }

  console.log("valid");
}

//initialize the form validation
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form[data-validate]");

  //disable HTML5 validation
  form.setAttribute("novalidate", "");

  //initialize the error messages containers
  initErrorMessages(form);

  //handle on blur validation
  form.addEventListener(
    "blur",
    (event) => {
      const input = event.target;

      //filter for only required input and textarea
      if (
        ["INPUT", "TEXTAREA"].includes(input.tagName) &&
        VALIDATION_RULES[input.name].required
      ) {
        let value = getFieldValue(input);
        const [isValid, message] = validate(value, input.name);
        updateFieldStatus(input.name, isValid, message);
      }
    },
    true
  );

  //handle the submission validation
  form.addEventListener(
    "submit",
    (event) => {
      event.preventDefault();
      formValidation(form);
    },
    true
  );
});
