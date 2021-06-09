import Note from "../../components/Note/Note";
import NotesList from "../../components/NotesList/NotesList";
import NoteData from "../types/NoteData";

interface IAppStorage {
  getData: () => Promise<NoteData[]> | NoteData[];
  addNote: (note: Note) => void;
  deleteNote: ((note: Note, list: NotesList) => void) | ((id: string) => void);
  updateNote: ((list: NotesList) => void) | ((id: string, note: Note) => void);
}

export default IAppStorage;
