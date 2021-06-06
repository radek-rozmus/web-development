import "./HamburgerMenu.scss";
import HamburgerMenuProps from "./HamburgerMenuProps";

export default class HamburgerMenu implements HamburgerMenuProps {
  context: HTMLElement;

  element: HTMLDivElement;
  items: HTMLLIElement[] = [];

  constructor(context: HTMLElement, items: string[]) {
    this.context = context;

    this.initHamburgerMenu(items);
  }

  initHamburgerMenu = (items: string[]) => {
    this.element = document.querySelector(".hamburger-menu");

    const hamburgerMenuList = document.querySelector(".hamburger-menu__list");

    // items.forEach((item) => {
    //   const hamburgerMenuItem = document.createElement("li");
    //   hamburgerMenuItem.classList.add("hamburger-menu__item");
    //   this.items.push(hamburgerMenuItem);

    //   const hamburgerMenuLink = document.createElement("a");
    //   hamburgerMenuLink.classList.add("hamburger-menu__link");
    //   hamburgerMenuLink.innerText = item;
    //   hamburgerMenuLink.href = '#';

    //   hamburgerMenuItem.appendChild(hamburgerMenuLink);
    //   hamburgerMenuList.appendChild(hamburgerMenuItem);
    // });
  };

  hamburgerMenuToggle = () => {
    this.element.classList.toggle("hamburger-menu--active");
  };
}
