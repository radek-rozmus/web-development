import NotesList from "../NotesList/NotesList";

export default interface NotesListProps {
    list: NotesList;
    text: string;

    element: HTMLElement;
}
