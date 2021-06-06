import Main from '../Main/Main';
import Note from '../Note/Note';
import NotesList from '../NotesList/NotesList';
import './AddNotePanel.scss';
import AddNotePanelProps from './AddNotePanelProps';

export default class AddNotePanel implements AddNotePanelProps {
    contextObject: Main;
    context: HTMLElement;
    list: NotesList;

    element: HTMLElement;
    input: HTMLInputElement;
    button: HTMLButtonElement;

    constructor(addNotePanelContext: Main) {
        this.contextObject = addNotePanelContext;
        this.context = addNotePanelContext.element;
        this.list = addNotePanelContext.notesList;
        this.initAddNotePanel();
      }

      initAddNotePanel = () => {
        this.element = document.querySelector('.add-note-panel');

        this.input = document.querySelector('.add-note-panel__input');

        this.button = document.querySelector('.add-note-panel__button');
        this.button.onclick = this.handleAddNoteClick;
    }

    handleAddNoteClick = () => {
      if(this.input.value){
      const note = new Note(this.input.value, this.list);
      this.input.value = '';
      this.contextObject.saveData(this.list.listPayload.map(item => item.text));
      }
    }
}