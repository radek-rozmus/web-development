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
        this.element.classList.add('notes-list__note');
        this.element.innerText = this.text;
    }

}
