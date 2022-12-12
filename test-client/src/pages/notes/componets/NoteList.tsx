import { Button } from "../../../components/form/Button"
import { Table } from "../../../components/Table"
import { Note } from "../types"

type Props = {
  notes: Note[],
  editNote: (id: number | string) => Promise<void>
}

export const NoteList = ({ notes, editNote }: Props) => {
  return (
    <div className="note-list">
      <Table>
        <Table.Header>
          <Table.Row>
            <th>#</th>
            <th>Title</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Edición</th>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {notes.map((note, index) => (
            <Table.Row key={note.id}>
              <td>{index + 1}</td>
              <td>{note.title}</td>
              <td>{note.formattedCreatedAt}</td>
              <td>{note.formattedUpdatedAt}</td>
              <td><Button onClick={() => editNote(note.id)}>Editar</Button></td>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>      
    </div>
  )
}
