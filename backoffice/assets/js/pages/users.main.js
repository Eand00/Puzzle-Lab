/**
 * @file users.main.js
 * @version 1.0.0
 * @author Puzzle Lab
 * @contributors Daniele Wei Chen, Eand Avdiu, Vincenzo Bonura
 * @date 2025-01-22
 * @update 2025-01-25
 * @description Gestione degli utenti
 * @see README.md per ulteriori informazioni
 */

import { getAllUsers, createUser, updateUser, deleteUser } from '../services/users.service.js';

let currentUser = null;

async function initUsers() {
    try {
        const users = await getAllUsers();
        renderUsers(users);
    } catch (error) {
        showToast('error', 'Errore', error.message);
    }
}

function renderUsers(users) {
    const tbody = document.getElementById('usersTableBody');
    
    tbody.innerHTML = users.map(user => `
        <tr data-user='${JSON.stringify(user)}'>
            <td>${user.email}</td>
            <td>${user.nome}</td>
            <td>${user.cognome}</td>
            <td>${user.ruolo}</td>
            <td class="actions-cell">
                <button class="btn-secondary edit-btn">
                    Modifica
                </button>
                <button class="btn-primary danger delete-btn">
                    Elimina
                </button>
            </td>
        </tr>
    `).join('');

    // Add event listeners for edit and delete buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const userData = JSON.parse(btn.closest('tr').dataset.user);
            openModal(userData);
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const userData = JSON.parse(btn.closest('tr').dataset.user);
            handleDelete(userData.email);
        });
    });
}

function validateForm(form) {
    const email = form.email.value;
    const nome = form.nome.value;
    const cognome = form.cognome.value;
    const ruolo = form.ruolo.value;
    const password = form.password.value;

    // Email validation
    if (!email.match(/^[\w.-]+@[\w.-]+\.[a-z]{2,}$/)) {
        showError(form.email, 'Formato email non valido');
        return false;
    }

    // Nome validation
    if (!nome.match(/^[a-zA-Z\s]+$/)) {
        showError(form.nome, 'Il nome può contenere solo lettere e spazi');
        return false;
    }

    // Cognome validation
    if (!cognome.match(/^[a-zA-Z\s]+$/)) {
        showError(form.cognome, 'Il cognome può contenere solo lettere e spazi');
        return false;
    }

    // Password validation (only required for new users)
    if (!currentUser && !password) {
        showError(form.password, 'La password è obbligatoria per i nuovi utenti');
        return false;
    }

    // Ruolo validation
    if (!ruolo) {
        showError(form.ruolo, 'Seleziona un ruolo valido');
        return false;
    }

    return true;
}

function showError(input, message) {
    const errorSpan = input.nextElementSibling;
    errorSpan.textContent = message;
    errorSpan.style.display = 'block';
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(span => {
        span.textContent = '';
        span.style.display = 'none';
    });
}

function openModal(user = null) {
    currentUser = user;
    const modal = document.getElementById('userModal');
    const form = document.getElementById('userForm');
    const title = document.getElementById('modalTitle');
    const passwordHelp = document.getElementById('passwordHelp');
    
    clearErrors();
    title.textContent = user ? 'Modifica Utente' : 'Nuovo Utente';
    passwordHelp.textContent = user ? ' (lasciare vuoto per non modificare)' : '*';

    if (user) {
        form.email.value = user.email;
        form.email.readOnly = true;
        form.nome.value = user.nome;
        form.cognome.value = user.cognome;
        form.ruolo.value = user.ruolo;
        form.password.required = false;
    } else {
        form.reset();
        form.email.readOnly = false;
        form.password.required = true;
    }
    
    modal.classList.add('show');
}

function closeModal() {
    const modal = document.getElementById('userModal');
    modal.classList.remove('show');
    currentUser = null;
    document.getElementById('userForm').reset();
    clearErrors();
}

function showToast(type, title, message) {
    const toast = document.querySelector('toast-component');
    toast.showToast(type, title, message);
}

async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    
    clearErrors();
    if (!validateForm(form)) {
        return;
    }

    const userData = {
        email: form.email.value,
        nome: form.nome.value,
        cognome: form.cognome.value,
        ruolo: form.ruolo.value
    };

    if (form.password.value) {
        userData.password = form.password.value;
    }
    
    try {
        if (currentUser) {
            await updateUser(userData);
            showToast('success', 'Successo', 'Utente aggiornato correttamente');
        } else {
            await createUser(userData);
            showToast('success', 'Successo', 'Utente creato correttamente');
        }
        closeModal();
        initUsers();
    } catch (error) {
        showToast('error', 'Errore', error.message);
    }
}

async function handleDelete(email) {
    if (confirm('Sei sicuro di voler eliminare questo utente?')) {
        try {
            await deleteUser(email);
            showToast('success', 'Successo', 'Utente eliminato correttamente');
            initUsers();
        } catch (error) {
            showToast('error', 'Errore', error.message);
        }
    }
}

// Event Listeners
document.getElementById('addUserBtn').addEventListener('click', () => openModal());
document.getElementById('userForm').addEventListener('submit', handleSubmit);

// Make closeModal available globally
window.closeModal = closeModal;

// Initialize page
initUsers();