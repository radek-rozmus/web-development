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
    const data = this.db.collection('notes').get().then((res) => res.docs).then(docs => docs.map(doc => doc.data())).then(data => data.map(note => {return({text: note.text, colorClass: note.colorClass, pinned: note.pinned} as NoteData)}))
    return await data;
  }
  addNote(note: Note){
   const res = this.db.collection('notes').add({text: note.text, colorClass: note.colorClass, pinned: note.pinned})
  }
  deleteNote(id: string){
    const res = this.db.collection('notes').doc(id).delete();
  }
  updateNote(id: string, note: Note){
    const res = this.db.collection('notes').doc(id).update({text: note.text, colorClass: note.colorClass, pinned: note.pinned});
  }
}
