import './Main.scss';
import MainProps from './MainProps';

import AddNotePanel from '../AddNotePanel/AddNotePanel';
import NotesList from '../NotesList/NotesList';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';

export default class Main implements MainProps {
    element: HTMLElement;
    hamburgerMenu: HamburgerMenu;
    addNotePanel: AddNotePanel;
    notesList: NotesList;

    constructor() {
        this.initMain();
      }

    initMain = () => {
        this.element =  document.querySelector('.main');
        this.hamburgerMenu = new HamburgerMenu(this.element, ['Notes', 'Notifications', 'Help']);
        this.notesList = new NotesList(this, []);
        this.addNotePanel = new AddNotePanel(this);
    }

    saveData(data: string[]) {
      localStorage.setItem("notes", JSON.stringify(data));
    }
    getData(): string[] {
      const data = localStorage.getItem("notes");
      if (data) {
        return JSON.parse(data);
      } else {
        return [];
      }
    }
}