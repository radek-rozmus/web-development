import firebase from 'firebase';
import Note from '../../components/Note/Note';
import NotesList from '../../components/NotesList/NotesList';
import {firebaseConfig} from '../../config';

import NoteData from "../../models/types/NoteData";
import IAppStorage from "./IAppStorage";

// import firebase from 'firebase';
// import firebaseConfig from '../../config';

export default class AppFirestoreStorage implements IAppStorage {
  firebaseApp = firebase.initializeApp(firebaseConfig);
  db = this.firebaseApp.firestore();
  async getData(): Promise<NoteData[]>{
    return await this.db.collection('notes').get().then((res) => res.docs).then(docs => docs.map(doc => ({data: doc.data(), id: doc.id}))).then(data => data.map(note => {return({text: note.data.text, colorClass: note.data.colorClass, pinned: note.data.pinned, id: note.id})}))
  }
  async addNote(note: Note){
   const res = this.db.collection('notes').add({text: note.text, colorClass: note.colorClass, pinned: note.pinned});
   note.id = await res.then(res => res.id);
  }
  async deleteNote(id: string){
    const res = this.db.collection('notes').doc(id).delete();
  }
  async updateNote(id: string, note: Note){
    this.db.collection('notes').doc(id).update({text: note.text, colorClass: note.colorClass, pinned: note.pinned});
  }
}
