import "./Main.scss";
import MainProps from "./MainProps";

import AddNotePanel from "../AddNotePanel/AddNotePanel";
import NotesList from "../NotesList/NotesList";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import AppLocalStorage from "../../models/interfaaces/AppLocalStorage";
import AppFirestoreStorage from "../../models/interfaaces/AppFirestoreStorage";
import { storageConfig } from "../../config";
import StorageType from "../../models/types/StorageType";

// import firebase from 'firebase';
// import firebaseConfig from '../../config';

export default class Main implements MainProps {
  element: HTMLElement;
  hamburgerMenu: HamburgerMenu;
  addNotePanel: AddNotePanel;
  notesList: NotesList;
  storage: AppLocalStorage | AppFirestoreStorage;

  constructor() {
    this.initMain();
  }

  initMain = () => {
    switch (`${storageConfig}`) {
      case 'local':
        this.storage = new AppLocalStorage();
        break;
      case 'firestore':
        this.storage = new AppFirestoreStorage();
        break;
    }
    this.element = document.querySelector(".main");
    this.hamburgerMenu = new HamburgerMenu(this.element, [
      "Notes",
      "Notifications",
      "Help",
    ]);
    this.notesList = new NotesList(this, []);
    this.addNotePanel = new AddNotePanel(this);
  };

  // saveData(data: NoteData[]) {
  //   localStorage.setItem("notes", JSON.stringify(data));
  // }
  // getData(): NoteData[] {
  //   const data = localStorage.getItem("notes");
  //   if (data) {
  //     return JSON.parse(data).map(
  //       (item: { text: string; colorClass: string }) => item
  //     );
  //   } else {
  //     return [];
  //   }
  // }
}
