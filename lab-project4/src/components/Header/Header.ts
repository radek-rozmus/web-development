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
        this.element =  document.querySelector('.header');

        this.hamburgerButton = document.querySelector('.hamburger__button');
        this.hamburgerButton.addEventListener('click', this.handleHamburgerClick);
    }

    handleHamburgerClick = () => {
        this.hamburgerButton.classList.toggle('hamburger__button--active');
        this.hamburgerMenu.hamburgerMenuToggle();
    }

}