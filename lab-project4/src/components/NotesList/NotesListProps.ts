import Note from '../Note/Note';

export default interface NotesListProps {
  context: HTMLElement;
  listPayload: Note[];

  element:HTMLDivElement;
}
