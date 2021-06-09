import "./NotesList.scss";
import NotesListProps from "./NotesListProps";

import Note from "../Note/Note";
import Main from "../Main/Main";
import NoteData from "../../models/types/NoteData";
import AppLocalStorage from "../../models/interfaaces/AppLocalStorage";
import AppFirestoreStorage from "../../models/interfaaces/AppFirestoreStorage";

export default class NotesList implements NotesListProps {
  contextObject: Main;
  context: HTMLElement;
  listPayload: Note[];

  element: HTMLDivElement;
  pinnedList: HTMLDivElement;

  pinnedListTitle: HTMLDivElement;
  notesListTitle: HTMLDivElement;

  constructor(context: Main, listPayload: Note[] = []) {
    this.contextObject = context;
    this.context = context.element;
    this.listPayload = listPayload;
    
    this.initNotesList().then(() => {
    this.getDataBlock()
    });
    ;
  }

  initNotesList = async () => {
    this.element = document.querySelector(".notes-list");
    this.pinnedList = document.querySelector(".pinned-list");
    this.pinnedListTitle = document.querySelector(".pinned-list-title");
    this.notesListTitle = document.querySelector(".notes-list-title");
    this.element.innerHTML = "";
    this.pinnedList.innerHTML = "";
    this.toggleListsDisplay();
  };
  noteAdd(note: Note) {
    this.listPayload.push(note);
    if (note.pinned) {
      if (note.element.parentElement === this.element)
        this.element.removeChild(note.element);
      this.pinnedList.appendChild(note.element);
    } else {
      if (note.element.parentElement === this.pinnedList)
        this.pinnedList.removeChild(note.element);
      this.element.appendChild(note.element);
    }
  }
  async renderCurrentElements() {
    console.log("render");
    this.element.innerHTML = "";
    this.pinnedList.innerHTML = "";
    this.listPayload = [];
    if(this.contextObject.storage instanceof AppLocalStorage){
    this.listPayload = this.contextObject.storage
      .getData()
      .map(
        (item: NoteData) =>
          new Note(item.text, this, item.colorClass, item.pinned)
      );
    }
    this.toggleListsDisplay();
  }
  toggleListsDisplay() {
    console.log(
      `${this.element.hasChildNodes()} ${this.pinnedList.hasChildNodes()}`
    );
    if (this.element.hasChildNodes()) {
      this.notesListTitle.classList.remove("inactive");
    } else {
      this.notesListTitle.classList.add("inactive");
    }
    if (this.pinnedList.hasChildNodes()) {
      this.pinnedListTitle.classList.remove("inactive");
    } else {
      this.pinnedListTitle.classList.add("inactive");
    }
  }
  async getDataBlock(){
    if (this.contextObject.storage instanceof AppLocalStorage) {
      this.listPayload = this.contextObject.storage
        .getData()
        .map(
          (item: NoteData) =>
            new Note(item.text, this, item.colorClass, item.pinned, item.id)
        );
    } else if (this.contextObject.storage instanceof AppFirestoreStorage) {
      this.listPayload = await this.contextObject.storage
        .getData().then(res => res.map(
          (item: NoteData) =>
            new Note(item.text, this, item.colorClass, item.pinned, item.id)
        ))
        
    }
  }
}
