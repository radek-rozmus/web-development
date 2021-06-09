import AppFirestoreStorage from '../../models/interfaaces/AppFirestoreStorage';
import AppLocalStorage from '../../models/interfaaces/AppLocalStorage';
import AddNotePanel from '../AddNotePanel/AddNotePanel';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import NotesList from '../NotesList/NotesList';

export default interface MainProps{
    element: HTMLElement;
    hamburgerMenu: HamburgerMenu;
    addNotePanel: AddNotePanel;
    notesList: NotesList;
    storage: AppLocalStorage | AppFirestoreStorage;
}