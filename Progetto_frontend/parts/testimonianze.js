/**
 * 
 * 
 */

const boxScroll = document.getElementById("box-scroll");

function scroll() {
    boxScroll.classList.add("scroll");
}

function carousel() {
    const firstElement = document.getElementsByClassName("card")[0];
    boxScroll.classList.remove("scroll");
    firstElement.remove();
    boxScroll.appendChild(firstElement);
    setTimeout(scroll, 4700);
    setTimeout(carousel, 5000);
}

carousel();