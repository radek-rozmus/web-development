import './NotesList.scss';
import NotesListProps from './NotesListProps';

import Note from '../Note/Note';
import Main from '../Main/Main';

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
    this.element = document.createElement("div");
    this.element.classList.add('notes-list');
    this.context.appendChild(this.element);
    this.listPayload = this.contextObject.getData();
    this.renderCurrentElements();
  }
  noteAdd(note: Note) {
    this.listPayload.push(note);
    this.element.appendChild(note.element);
  }
  noteRemove(note: Note) {
    console.log("list remove");
  }
  renderCurrentElements() {
    this.element.innerHTML = "";
    console.log(this.listPayload)
    this.listPayload.map((note: Note) => {
      const newNote = new Note(note.text, this);//note text undefined

      this.noteAdd(newNote);
      return newNote;
    });
  }
}
