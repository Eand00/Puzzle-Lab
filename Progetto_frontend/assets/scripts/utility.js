/**
 * @file utility.js
 * @description Utility script for the frontend of the service portal.
 * @version 1.0.0
 * 
 * This script handles the utility functions for the portal, like the navbar toggle.
 * 
 * @author Puzzle Lab
 * @author Bonura Vincenzo
 * @author Lupano Alberto
 * @author Picciotto Luca
 * @date 2024-11-29
 * 
 * @see README_FRONTEND.md for additional information.
 */

/**
 * Toggle the navbar collapse on click.
 */
document.addEventListener('DOMContentLoaded', function () {
    const navbarToggle = document.getElementById('navbarBtn');
    const navbarCollapse = document.getElementById('navbarText');

    if (navbarToggle && navbarCollapse) {
        navbarToggle.addEventListener('click', function () {
            [navbarCollapse, navbarToggle].forEach(element => element.classList.toggle('show'));
        });
        navbarCollapse.addEventListener('click', function () {
            [navbarCollapse, navbarToggle].forEach(element => element.classList.remove('show'));
        });
    }
});

/**
 * Adjust the header height on scroll.
 */
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    header.classList.toggle('header-scroll', window.scrollY > 0);
});
