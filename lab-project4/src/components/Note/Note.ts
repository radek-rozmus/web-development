import NotesList from "../NotesList/NotesList";
import "./Note.scss";
import NoteProps from "./NoteProps";
import NoteData from "../../models/types/NoteData";

export default class Note implements NoteProps {
  list: NotesList;
  text: string;

  element: HTMLElement;
  isEditing: boolean;
  noteContentDisplay: HTMLInputElement | HTMLDivElement;
  noteContentDisplayInput: HTMLInputElement;
  noteContentDisplayDiv: HTMLDivElement;
  editNoteIcon: HTMLElement;
  palette: HTMLDivElement;
  changeColorIcon: HTMLElement;
  wrapper: HTMLDivElement;
  colorClass: string;

  constructor(text: string, list: NotesList, colorClass: string) {
    this.list = list;
    this.text = text;
    this.colorClass = colorClass;
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
    editNoteButton.onclick = this.handleToggleEditClick;
    noteMenu.appendChild(editNoteButton);

    this.editNoteIcon = document.createElement("i");
    this.editNoteIcon.classList.add("icon-pencil");
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
    this.list.noteRemove(this);
  };
  handleToggleEditClick = () => {
    if (this.isEditing) {
      this.noteContentDisplay.removeChild(this.noteContentDisplayInput);
      this.text = this.noteContentDisplayInput.value;
      this.noteContentDisplay.appendChild(this.noteContentDisplayDiv);
      const data = this.list.listPayload.map(
        (item: Note): NoteData => ({
          text: item.text,
          colorClass: item.colorClass,
        })
      );
      this.list.contextObject.saveData(data);
      this.list.renderCurrentElements();
      this.editNoteIcon.classList.toggle("icon-pencil");
      this.editNoteIcon.classList.toggle("icon-check");
    } else {
      this.noteContentDisplay.removeChild(this.noteContentDisplayDiv);
      this.noteContentDisplay.appendChild(this.noteContentDisplayInput);
      this.editNoteIcon.classList.toggle("icon-pencil");
      this.editNoteIcon.classList.toggle("icon-check");
      this.noteContentDisplayInput.focus();
    }
    const newEditing = !this.isEditing;
    this.isEditing = newEditing;
  };
  handleTogglePalette = () => {
    this.palette.classList.toggle("note__palette--active");
    this.changeColorIcon.classList.toggle("icon-color-adjust");
    this.changeColorIcon.classList.toggle("icon-check");
  };
  handleChangeColor = (colorClass: string) => {
    console.log(colorClass)
    this.colorClass = colorClass;
    const data = this.list.listPayload.map(
      (item: Note): NoteData => ({
        text: item.text,
        colorClass: item.colorClass,
      })
    );
    this.list.contextObject.saveData(data);
    this.list.renderCurrentElements();
  };
}
