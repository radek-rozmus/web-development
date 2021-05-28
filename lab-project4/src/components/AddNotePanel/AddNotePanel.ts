import Note from '../Note/Note';
import NotesList from '../NotesList/NotesList';
import './AddNotePanel.scss';
import AddNotePanelProps from './AddNotePanelProps';

export default class AddNotePanel implements AddNotePanelProps {
    context: HTMLElement;
    list: NotesList;

    element: HTMLElement;
    input: HTMLInputElement;
    button: HTMLButtonElement;

    constructor(addNotePanelContext: HTMLElement, list: NotesList) {
        this.context = addNotePanelContext;
        this.list = list;
        this.initAddNotePanel();
      }

      initAddNotePanel = () => {
        this.element = document.createElement('div');
        this.element.classList.add('add-note-panel');
        this.context.insertBefore(this.element, this.context.firstChild)

        this.input = document.createElement('input');
        this.input.classList.add('add-note-panel__input');
        this.input.innerText = "Input";
        this.element.appendChild(this.input);

        this.button = document.createElement('button');
        this.button.classList.add('add-note-panel__button');
        this.button.textContent = '+';
        this.button.onclick = this.handleAddNoteClick;
        this.element.appendChild(this.button);
    }

    handleAddNoteClick = () => {
      if(this.input.value){
      const note = new Note(this.input.value, this.list);
      this.list.noteAdd(note);
      this.input.value = '';
      }
    }
}