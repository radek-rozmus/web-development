import Note from "../Note/Note";
import NotesList from "../NotesList/NotesList";

export class App {
  root: HTMLDivElement;
  header: HTMLDivElement;


  notes: NotesList;

  constructor() {
    this.initApp();
  }

  initApp() {
    this.root = document.getElementById('root') as HTMLDivElement;
    
    this.header =  document.createElement('div');


    this.notes = new NotesList(this.root);
    this.notes.listAdd(new Note(5));
    console.log(this.notes.listPayload[0].counter);
  }
}
