import NotesList from "../NotesList/NotesList";

export default interface NotesListProps {
  list: NotesList;
  text: string;
  colorClass: string;
  pinned: boolean;

  element: HTMLElement;
  isEditing: boolean;
  noteContentDisplay: HTMLInputElement | HTMLDivElement;
  noteContentDisplayDiv: HTMLDivElement;
  noteContentDisplayInput: HTMLInputElement;
  editNoteIcon: HTMLElement;
  palette: HTMLDivElement;
  changeColorIcon: HTMLElement;
  wrapper: HTMLDivElement;
  id?: string;
}
