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
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarCollapse = document.querySelector('.collapse');

    navbarToggle.addEventListener('click', function () {
        navbarCollapse.classList.toggle('show');
    });
});
