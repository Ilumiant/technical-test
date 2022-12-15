import { Note } from "../types"

type Props = {
  selectedNote: Note
}

const NoteView = ({ selectedNote: note }: Props) => {
  return (
    <div className="note-view">
      <h4 className="note-view-title">Título: </h4>
      <p className="note-view-text">
        {note.title}
      </p>
      <h4 className="note-view-title">Cuerpo: </h4>
      <p className="note-view-text">
        {note.body}
      </p>
      <div className="note-view-dates">
        <div className="note-view-dates-created-at">
          <h4 className="note-view-title">Creada el: </h4>
          <span>{note.formattedCreatedAt}</span>
        </div>
        {note.formattedUpdatedAt && (
          <div className="note-view-dates-created-at">
            <h4 className="note-view-title">Actualizada el: </h4>
            <span>{note.formattedUpdatedAt}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default NoteView