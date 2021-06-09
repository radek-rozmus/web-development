import Note from "../../components/Note/Note";
import NotesList from "../../components/NotesList/NotesList";
import NoteData from "../../models/types/NoteData";
import IAppStorage from "./IAppStorage";

// import firebase from 'firebase';
// import firebaseConfig from '../../config';

export default class AppLocalStorage implements IAppStorage {
  // saveData(data: NoteData[]) {
  //   localStorage.setItem("notes", JSON.stringify(data));
  // }
  getData(): NoteData[] {
    const data = localStorage.getItem("notes");
    if (data) {
      return JSON.parse(data).map(
        (item: { text: string; colorClass: string, pinned: boolean }) => item
      );
    } else {
      return [];
    }
  }
  async addNote(note: Note){
    const data = this.getData();
    localStorage.setItem("notes", JSON.stringify([...await data, {text: note.text, colorClass: note.colorClass, pinned: note.pinned}]));
  }
  deleteNote(note: Note, list: NotesList){
    const index = list.listPayload.indexOf(note);
    list.listPayload.splice(index, 1);
    const data = list.listPayload.map(
      (item: Note): NoteData => ({
        text: item.text,
        colorClass: item.colorClass,
        pinned: item.pinned,
      })
    );
    localStorage.setItem("notes", JSON.stringify(data));
  }
  updateNote(list: NotesList){
    console.log('update')
    const data = list.listPayload.map(
      (item: Note): NoteData => ({
        text: item.text,
        colorClass: item.colorClass,
        pinned: item.pinned,
      })
    );
    localStorage.setItem("notes", JSON.stringify(data));
  }
}
