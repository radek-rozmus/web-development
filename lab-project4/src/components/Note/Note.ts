import NotesList from "../NotesList/NotesList";
import "./Note.scss";
import NoteProps from "./NoteProps";
import NoteData from "../../models/types/NoteData";
import AppLocalStorage from "../../models/interfaaces/AppLocalStorage";
import storageGuard from "../../models/guards/storageGuard";

export default class Note implements NoteProps {
  list: NotesList;
  text: string;
  colorClass: string;
  pinned: boolean;

  element: HTMLElement;
  isEditing: boolean;
  noteContentDisplay: HTMLInputElement | HTMLDivElement;
  noteContentDisplayInput: HTMLInputElement;
  noteContentDisplayDiv: HTMLDivElement;
  editNoteIcon: HTMLElement;
  palette: HTMLDivElement;
  changeColorIcon: HTMLElement;
  wrapper: HTMLDivElement;

  constructor(
    text: string,
    list: NotesList,
    colorClass: string,
    pinned: boolean
  ) {
    this.list = list;
    this.text = text;
    this.colorClass = colorClass;
    this.pinned = pinned;
    this.initNote();
  }

  initNote = () => {
    this.element = document.createElement("div");
    this.element.classList.add("note");

    this.wrapper = document.createElement("div");
    this.wrapper.classList.add("note__wrapper");
    this.wrapper.classList.add(this.colorClass);
    this.element.appendChild(this.wrapper);

    this.isEditing = false;

    this.noteContentDisplay = document.createElement("div");
    this.noteContentDisplay.classList.add("note__content-display");
    this.wrapper.appendChild(this.noteContentDisplay);

    this.noteContentDisplayInput = document.createElement("input");
    this.noteContentDisplayInput.classList.add("note__content-input");
    this.noteContentDisplayInput.onblur = this.handleToggleEditClick;
    this.noteContentDisplayInput.value = this.text;

    this.noteContentDisplayDiv = document.createElement("div");
    this.noteContentDisplayDiv.classList.add("note__content-div");
    this.noteContentDisplayDiv.innerText = this.text;
    this.noteContentDisplayDiv.onclick = this.handleToggleEditClick;
    this.noteContentDisplay.appendChild(this.noteContentDisplayDiv);

    const noteMenu = document.createElement("div");
    noteMenu.classList.add("note__menu");
    this.wrapper.appendChild(noteMenu);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("note__button");
    deleteButton.classList.add("note__delete-button");
    deleteButton.innerText = "DELETE";
    deleteButton.onclick = this.handleDeleteButtonClick;
    noteMenu.appendChild(deleteButton);

    const editNoteButton = document.createElement("button");
    editNoteButton.classList.add("note__button");
    editNoteButton.classList.add("note__edit-button");
    editNoteButton.onclick = this.handleTogglePin;
    noteMenu.appendChild(editNoteButton);

    this.editNoteIcon = document.createElement("i");
    if (this.pinned) this.editNoteIcon.classList.add("icon-pin");
    else this.editNoteIcon.classList.add("icon-pin-outline");
    editNoteButton.appendChild(this.editNoteIcon);

    //change color button

    const changeColorButton = document.createElement("button");
    changeColorButton.classList.add("note__button");
    changeColorButton.classList.add("note__color-button");
    changeColorButton.onclick = this.handleTogglePalette;
    noteMenu.appendChild(changeColorButton);

    this.changeColorIcon = document.createElement("i");
    this.changeColorIcon.classList.add("icon-color-adjust");
    changeColorButton.appendChild(this.changeColorIcon);

    //palette

    this.palette = document.createElement("div");
    this.palette.classList.add("note__palette");
    this.element.appendChild(this.palette);

    const buttonPrimary = document.createElement("button");
    buttonPrimary.classList.add("note__palette-button");
    buttonPrimary.classList.add("primary");
    buttonPrimary.onclick = () => this.handleChangeColor("primary");
    this.palette.appendChild(buttonPrimary);

    const buttonPurple = document.createElement("button");
    buttonPurple.classList.add("note__palette-button");
    buttonPurple.classList.add("purple");
    buttonPurple.onclick = () => this.handleChangeColor("purple");
    this.palette.appendChild(buttonPurple);

    const buttonGreen = document.createElement("button");
    buttonGreen.classList.add("note__palette-button");
    buttonGreen.classList.add("green");
    buttonGreen.onclick = () => this.handleChangeColor("green");
    this.palette.appendChild(buttonGreen);

    const buttonBlack = document.createElement("button");
    buttonBlack.classList.add("note__palette-button");
    buttonBlack.classList.add("black");
    buttonBlack.onclick = () => this.handleChangeColor("black");
    this.palette.appendChild(buttonBlack);

    const buttonRed = document.createElement("button");
    buttonRed.classList.add("note__palette-button");
    buttonRed.classList.add("red");
    buttonRed.onclick = () => this.handleChangeColor("red");
    this.palette.appendChild(buttonRed);

    const buttonOrange = document.createElement("button");
    buttonOrange.classList.add("note__palette-button");
    buttonOrange.classList.add("orange");
    buttonOrange.onclick = () => this.handleChangeColor("orange");
    this.palette.appendChild(buttonOrange);

    this.list.noteAdd(this);
  };

  handleDeleteButtonClick = () => {
    if (this.list.contextObject.storage instanceof AppLocalStorage) {
      this.list.contextObject.storage.deleteNote(this, this.list);
    }
    this.list.renderCurrentElements();
  };
  handleToggleEditClick = () => {
    if (this.isEditing && this.noteContentDisplayInput.value) {
      this.noteContentDisplay.removeChild(this.noteContentDisplayInput);
      this.text = this.noteContentDisplayInput.value;
      this.noteContentDisplay.appendChild(this.noteContentDisplayDiv);
      // if (this.list.contextObject.storage instanceof AppLocalStorage) {
      //   this.list.contextObject.storage.updateNote(this.list);
      // }
      storageGuard(this.list.contextObject.storage, this.list.contextObject.storage.updateNote.bind(this, this.list), () => {});
      this.list.renderCurrentElements();
    } else if (!this.isEditing) {
      this.noteContentDisplay.removeChild(this.noteContentDisplayDiv);
      this.noteContentDisplay.appendChild(this.noteContentDisplayInput);
      this.noteContentDisplayInput.focus();
    } else {
      this.list.renderCurrentElements();
    }
    const newEditing = !this.isEditing;
    this.isEditing = newEditing;
  };
  handleTogglePin = () => {
    this.pinned = !this.pinned;
    storageGuard(this.list.contextObject.storage, this.list.contextObject.storage.updateNote.bind(this, this.list), () => {});
    this.list.renderCurrentElements();
    //this.list.toggleListsDisplay();
  };
  handleTogglePalette = () => {
    this.palette.classList.toggle("note__palette--active");
    this.changeColorIcon.classList.toggle("icon-color-adjust");
    this.changeColorIcon.classList.toggle("icon-cancel-circled");
  };
  handleChangeColor = (colorClass: string) => {
    this.colorClass = colorClass;
    storageGuard(this.list.contextObject.storage, this.list.contextObject.storage.updateNote.bind(this, this.list), () => {});
    this.list.renderCurrentElements();
  };
}
