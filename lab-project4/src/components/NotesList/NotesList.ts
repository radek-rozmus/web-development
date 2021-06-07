import "./NotesList.scss";
import NotesListProps from "./NotesListProps";

import Note from "../Note/Note";
import Main from "../Main/Main";
import NoteProps from "../Note/NoteProps";
import NoteData from "../../models/types/NoteData";

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

    this.initNotesList();
  }

  initNotesList = () => {
    this.element = document.querySelector(".notes-list");
    this.pinnedList = document.querySelector(".pinned-list");
    this.pinnedListTitle = document.querySelector(".pinned-list-title");
    this.notesListTitle = document.querySelector(".notes-list-title");
    this.listPayload = this.contextObject
      .getData()
      .map(
        (item: NoteData) =>
          new Note(item.text, this, item.colorClass, item.pinned)
      );
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
  noteRemove(note: Note) {
    const index = this.listPayload.indexOf(note);
    console.log(this.listPayload.splice(index, 1));
    console.log(this.listPayload);
    const data = this.listPayload.map(
      (item: Note): NoteData => ({
        text: item.text,
        colorClass: item.colorClass,
        pinned: item.pinned,
      })
    );
    this.contextObject.saveData(data);
    this.renderCurrentElements();
  }
  renderCurrentElements() {
    console.log("render");
    this.element.innerHTML = "";
    this.pinnedList.innerHTML = "";
    this.listPayload = [];
    this.listPayload = this.contextObject
      .getData()
      .map(
        (item: NoteData) =>
          new Note(item.text, this, item.colorClass, item.pinned)
      );
  }
  toggleListsDisplay() {
    console.log('togggle list display')
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
}
