import './NotesList.scss';
import NotesListProps from './NotesListProps';

import Note from '../Note/Note';
import Main from '../Main/Main';
import NoteProps from '../Note/NoteProps';
import NoteData from '../../models/types/NoteData';

export default class NotesList implements NotesListProps {
  contextObject: Main;
  context: HTMLElement;
  listPayload: Note[];

  element: HTMLDivElement;

  constructor(context: Main, listPayload: Note[] = []) {
    this.contextObject = context;
    this.context = context.element;
    this.listPayload = listPayload;

    this.initNotesList();
  }

  initNotesList = () => {
    this.element = document.querySelector(".notes-list");
    this.listPayload = this.contextObject.getData().map((item: NoteData) => new Note(item.text, this, item.colorClass));
  }
  noteAdd(note: Note) {
    this.listPayload.push(note);
    this.element.appendChild(note.element);
  }
  noteRemove(note: Note) {
    const index = this.listPayload.indexOf(note);
    console.log(this.listPayload.splice(index, 1));
      console.log(this.listPayload);
      const data = this.listPayload.map((item: Note): NoteData => ({text: item.text, colorClass: item.colorClass}));
      this.contextObject.saveData(data);
      this.renderCurrentElements();
  }
  renderCurrentElements(){
    console.log("render");
    this.element.innerHTML = "";
    this.listPayload = [];
    this.listPayload = this.contextObject.getData().map((item: NoteData) => new Note(item.text, this, item.colorClass));
    // this.listPayload.map((item) => {
    //   const newNote = new Note(item.text, this);
    //   return newNote;
    // });
  }
}
