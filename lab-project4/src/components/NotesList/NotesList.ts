import Note from "../Note/Note";


export default class NotesList {
  listPayload: Note[];
  listContext: HTMLDivElement;

  

  constructor(
    listContext: HTMLDivElement,
    listPayload: Note[] = [],
  ) { 
    this.listPayload = listPayload;
    this.listContext = listContext;
    this.listInit(this.listContext);
  }

  listInit(where: HTMLDivElement) {
    console.log('list init')
  }
  listAdd(note: Note) {
    this.listPayload.push(note)
  }
  listRemove(note: Note) {
   console.log('list remove')
  }
}
