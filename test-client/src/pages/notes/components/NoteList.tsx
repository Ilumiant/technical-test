import { useState } from "react"
import { Button } from "../../../components/form/Button"
import { Table } from "../../../components/Table"
import { Note } from "../types"

type Props = {
  notes: Note[],
  showNote: (id: number | string) => Promise<void>,
  editNote: (id: number | string) => Promise<void>,
  deleteNote: (note: Note) => Promise<void>
}

export const NoteList = ({ notes, showNote, editNote, deleteNote }: Props) => {
  const [orderBy, setOrderBy] = useState<string>('createdAt')
  const [textFilter, setTextFilter] = useState('')

  function sortNotesBy(noteA: Note, noteB: Note) {
    if (orderBy === 'title') {
      if (noteA.title > noteB.title) return 1
      else if (noteA.title < noteB.title) return -1
      else return 0
    } else if (orderBy === 'createdAt') {
      if (noteA.createdAt > noteB.createdAt) return 1
      else if (noteA.createdAt < noteB.createdAt) return -1
      else return 0
    } else if (orderBy === 'updatedAt') {
      if (noteA.updatedAt > noteB.updatedAt) return 1
      else if (noteA.updatedAt < noteB.updatedAt) return -1
      else return 0
    } else {
      return 0
    }
  }

  function filterNotes(note: Note) {
    if (textFilter === '') {
      return true
    } else if (
      note.title.toLowerCase().includes(textFilter.toLowerCase()) ||
      note.body.toLowerCase().includes(textFilter.toLowerCase()) ||
      note.formattedCreatedAt.toLowerCase().includes(textFilter.toLowerCase()) ||
      note.formattedUpdatedAt.toLowerCase().includes(textFilter.toLowerCase())
    ) {
      return true
    } else {
      return false
    }
  }

  return (
    <div className="note-list">
      <div className="note-list-filters">
        <div>
          <label>Filtrar</label>
          <input className="input-text" value={textFilter} onChange={e => setTextFilter(e.target.value)}/>
        </div>
        <div>
          <label>Ordenar por</label>
          <select className="input-text" value={orderBy} onChange={e => setOrderBy(e.target.value)}>
            <option value="title">Título</option>
            <option value="createdAt">Creación</option>
            <option value="updatedAt">Edición</option>
          </select>
        </div>
      </div>
      <Table>
        <Table.Header>
          <Table.Row>
            <th>#</th>
            <th>Título</th>
            <th>Creada el</th>
            <th>Actualizada el</th>
            <th>Mostrar</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {notes
          .filter(filterNotes)
          .sort(sortNotesBy)
          .map((note, index) => (
            <Table.Row key={note.id}>
              <td>{index + 1}</td>
              <td>{note.title}</td>
              <td>{note.formattedCreatedAt}</td>
              <td>{note.formattedUpdatedAt}</td>
              <td><Button variant="primary" onClick={() => showNote(note.id)}>Ver</Button></td>
              <td><Button variant="success" onClick={() => editNote(note.id)}>Editar</Button></td>
              <td><Button variant="danger" onClick={() => deleteNote(note)}>Eliminar</Button></td>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>      
    </div>
  )
}
