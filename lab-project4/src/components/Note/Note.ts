import NotesList from '../NotesList/NotesList';
import './Note.scss';
import NoteProps from './NoteProps';

export default class Note implements NoteProps{ 
    list: NotesList;
    text: string;

    element: HTMLElement;

    constructor(text: string, list: NotesList){
        this.list = list;
        this.text = text;
        this.initNote();
    }

    initNote = () => {
        this.element = document.createElement('div');
        this.element.classList.add('note');
        this.element.innerText = this.text;

        const noteMenu = document.createElement('div');
        noteMenu.classList.add('note__menu');
        this.element.appendChild(noteMenu);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('note__button');
        deleteButton.classList.add('note__delete-button');
        deleteButton.innerText = 'DELETE';
        noteMenu.appendChild(deleteButton);

        const editNoteButton = document.createElement('button');
        editNoteButton.classList.add('note__button');
        editNoteButton.classList.add('note__edit-button');
        noteMenu.appendChild(editNoteButton);

        const editNoteIcon = document.createElement('i');
        editNoteIcon.classList.add('icon-pencil');
        editNoteButton.appendChild(editNoteIcon);

        const changeColorButton = document.createElement('button');
        changeColorButton.classList.add('note__button');
        changeColorButton.classList.add('note__color-button');
        noteMenu.appendChild(changeColorButton);

        const changeColorIcon = document.createElement('i');
        changeColorIcon.classList.add('icon-color-adjust');
        changeColorButton.appendChild(changeColorIcon);


        this.list.noteAdd(this);
    }
}
