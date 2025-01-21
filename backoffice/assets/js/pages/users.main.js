// JavaScript per mostrare o nascondere il modulo
document.addEventListener("DOMContentLoaded", () => {
    const addUserBtn = document.getElementById('addUserBtn');
    const createUserFormContainer = document.getElementById('createUserFormContainer');

    // Imposta il modulo come nascosto all'inizio
    createUserFormContainer.style.display = 'none';

    // Alterna la visibilità del modulo al clic sul pulsante
    addUserBtn.addEventListener('click', () => {
        if (createUserFormContainer.style.display === 'none') {
            createUserFormContainer.style.display = 'block';
        } else {
            createUserFormContainer.style.display = 'none';
        }
    });
});

 const API_BASE_URL = "/back-office/utente"; 

 // Funzione per ottenere tutti gli utenti
 async function fetchUsers() {
     const response = await fetch(API_BASE_URL);
     if (response.ok) {
         const users = await response.json();
         renderUserTable(users);
     } else {
         console.error("Errore nel recupero degli utenti");
     }
 }

 // Funzione per rendere dinamica la tabella
 function renderUserTable(users) {
     const userTableBody = document.getElementById("userTableBody");
     userTableBody.innerHTML = "";
     if (users.length === 0) {
         userTableBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">Nessun utente disponibile</td></tr>';
         return;
     }
     users.forEach(user => {
         const row = `
             <tr>
                 <td>${user.id}</td>
                 <td>${user.nome}</td>
                 <td>${user.email}</td>
                 <td>
                     <button class="btn btn-info btn-sm" onclick="editUser(${user.id})">Modifica</button>
                     <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Elimina</button>
                 </td>
             </tr>
         `;
         userTableBody.insertAdjacentHTML("beforeend", row);
     });
 }

 // Funzione per aggiungere un utente
 async function createUser(user) {
     const response = await fetch(API_BASE_URL, {
         method: "POST",
         headers: {
             "Content-Type": "application/json"
         },
         body: JSON.stringify(user)
     });
     if (response.ok) {
         await fetchUsers();
     } else {
         console.error("Errore nella creazione dell'utente");
     }
 }

 // Funzione per eliminare un utente
 async function deleteUser(userId) {
     const response = await fetch(`${API_BASE_URL}/${userId}`, {
         method: "DELETE"
     });
     if (response.ok) {
         await fetchUsers();
     } else {
         console.error("Errore nell'eliminazione dell'utente");
     }
 }

 // Event listener per il form di creazione
 document.getElementById("createUserForm").addEventListener("submit", async function(event) {
     event.preventDefault();
     const nome = document.getElementById("nome").value;
     const email = document.getElementById("email").value;
     const password = document.getElementById("password").value;
     await createUser({ nome, email, password });
 });

 // Carica gli utenti all'avvio
 fetchUsers();