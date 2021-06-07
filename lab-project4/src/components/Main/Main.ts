import "./Main.scss";
import MainProps from "./MainProps";

import AddNotePanel from "../AddNotePanel/AddNotePanel";
import NotesList from "../NotesList/NotesList";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import NoteData from "../../models/types/NoteData";

export default class Main implements MainProps {
  element: HTMLElement;
  hamburgerMenu: HamburgerMenu;
  addNotePanel: AddNotePanel;
  notesList: NotesList;

  constructor() {
    this.initMain();
  }

  initMain = () => {
    this.element = document.querySelector(".main");
    this.hamburgerMenu = new HamburgerMenu(this.element, [
      "Notes",
      "Notifications",
      "Help",
    ]);
    this.notesList = new NotesList(this, []);
    this.addNotePanel = new AddNotePanel(this);
  };

  saveData(data: NoteData[]) {
    localStorage.setItem("notes", JSON.stringify(data));
  }
  getData(): NoteData[] {
    const data = localStorage.getItem("notes");
    if (data) {
      return JSON.parse(data).map(
        (item: { text: string; colorClass: string }) => item
      );
    } else {
      return [];
    }
  }
}
