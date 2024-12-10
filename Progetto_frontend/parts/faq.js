/**
 *
 *
 */

/**
 * Add Event Listener Dropdown
 */

function eventListener(index) {
    const dropdown = document.getElementsByClassName('dropdown')[index];
    const dropdownArrow = document.getElementsByClassName('dropdown-arrow')[index];

    if (dropdownArrow.style.transform === 'rotate(180deg)') {
        dropdown.classList.remove('open');
        dropdownArrow.style.transform = 'rotate(0)';
    } else {
        dropdown.classList.add('open');
        dropdownArrow.style.transform = 'rotate(180deg)';
    }
}

function dropdownEventListener(array) {
    for (let i = 0; i < array.length; i++) {
        array[i].addEventListener('click', function() {
            eventListener(i);
        });
    }
}

const dropdownButton = document.getElementsByClassName('dropdown-button');

dropdownEventListener(dropdownButton);