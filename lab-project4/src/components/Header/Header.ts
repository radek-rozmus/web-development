import './Header.scss';
import HeaderProps from './HeaderProps';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';

export default class Header implements HeaderProps {
    hamburgerMenu: HamburgerMenu;


    element: HTMLElement;
    hamburgerButton: HTMLButtonElement;

    constructor( hamburgerMenu: HamburgerMenu){
        this.hamburgerMenu = hamburgerMenu;

        this.initHeader();
    }

    initHeader = () => {
        this.element = this.element =  document.querySelector('.header');
        

        const hamburger = document.createElement('div');
        hamburger.classList.add('hamburger');
        this.element.appendChild(hamburger);

        this.hamburgerButton = document.createElement('button');
        this.hamburgerButton.classList.add('hamburger__button');
        this.hamburgerButton.addEventListener('click', this.handleHamburgerClick)
        hamburger.appendChild(this.hamburgerButton);

        const hamburgerBox = document.createElement('span');
        hamburgerBox.classList.add('hamburger__box');
        this.hamburgerButton.appendChild(hamburgerBox);

        const hamburgerInner = document.createElement('span');
        hamburgerInner.classList.add('hamburger__inner');
        hamburgerBox.appendChild(hamburgerInner);
    }

    handleHamburgerClick = () => {
        this.hamburgerButton.classList.toggle('hamburger__button--active');
        this.hamburgerMenu.hamburgerMenuToggle();
    }

}