/**
 * @file footer-components.js
 * @version 1.0.0
 * @author Puzzle Lab
 * @contributors Bonura Vincenzo, Lupano Alberto, Picciotto Luca
 * @date 2024-12-14
 * @description This script handles the footer component of the site.
 * @extends HTMLElement
 * @see README_FRONTEND.md for additional information.
 */

class FooterComponent extends HTMLElement {
  constructor() {
    super();
    const basePath = this.getAttribute('base-path') || '.';

    this.template = document.createElement("template");
    this.template.innerHTML = `
            <footer class="py-5 text-light bg-dark "> 
                <div class="container">
                    <svg class="logo-brand">
                        <use href="${basePath}/assets/images/sprite.svg?v=2#logo-brand"></use>
                    </svg>
                    <p class="copyright text-center">2024 &copy; CacciaSaperi - www.cacciasaperi.it</p>
                </div>
               
                <ul class="footer-nav py-5 px-0">
                    <li><a class="text-white" href="${basePath}/index.html">HOME</a></li>
                    <li><a class="text-white" href="${basePath}/laboratori.html">LABORATORI</a></li>
                    <li><a class="text-white" href="${basePath}/chi-siamo.html">CHI SIAMO</a></li>
                    <li><a class="text-white" href="${basePath}/prenota-ora.html">PRENOTA ORA!</a></li>
                    <li><a class="text-white" href="${basePath}/contatti.html">CONTATTI</a></li>
                </ul>
                
            
                <div class="container icon-footer ">
                    <div class="social-icons">
                        <p class="text-white">SEGUICI SUI SOCIAL</p>
                        <div class="social-icons-container text-white">
                            <a href="#">
                                <svg width="32" height="32" fill="white">
                                    <use href="${basePath}/assets/images/sprite.svg?v=1#icon-facebook"></use>
                                </svg>
                            </a>
                            <a href="#">
                                <svg width="32" height="32" fill="white">
                                    <use href="${basePath}/assets/images/sprite.svg?v=1#icon-instagram"></use>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="container icon-footer py-5 px-0">
                    <p class="text-white">PROGETTO A CURA DI</p>
                    <div class="container text-white">
                        <img src="./assets/images/logo-acmos-bianco.png">
                        <img src="./assets/images/logo-libera.png">
                    </div>
                </div>
                 <div class="container social-icons-container  ">
                    <a href="#" class="text-white">COOKIE POLICY</a>
                    <a href="#" class="text-white ">PRIVACY POLICY</a> 
                </div>       
            </footer>
        `;
  }
               

  /**
   * This method is called when the component is connected to the DOM.
   * It is used to initialize the component.
   */
  connectedCallback() {
    const content = this.template.content.cloneNode(true);
    this.appendChild(content);
  }
}

customElements.define("footer-component", FooterComponent);
