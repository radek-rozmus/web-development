import NotesList from "../NotesList/NotesList";

export default interface AddNotePanelProps{
    context: HTMLElement;
    list: NotesList;

    element: HTMLElement;
    input: HTMLInputElement;
    button: HTMLButtonElement;
}