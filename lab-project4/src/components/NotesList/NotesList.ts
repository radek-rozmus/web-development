import './NotesList.scss';
import NotesListProps from './NotesListProps';

import Note from '../Note/Note';

export default class NotesList implements NotesListProps {
  context: HTMLElement;
  listPayload: Note[];

  element: HTMLDivElement;

  constructor(listContext: HTMLElement, listPayload: Note[] = []) {
    this.context = listContext;
    this.listPayload = listPayload;

    this.initNotesList();
  }

  initNotesList = () => {
    this.element = document.createElement("div");
    this.element.classList.add('notes-list');
    this.context.appendChild(this.element);
  }
  noteAdd(note: Note) {
    this.listPayload.push(note);
    this.element.appendChild(note.element);
  }
  noteRemove(note: Note) {
    console.log("list remove");
  }
}
