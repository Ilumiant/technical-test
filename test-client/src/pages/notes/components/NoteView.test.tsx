import { render, screen } from "@testing-library/react"
import { formatDateTime } from "../../../utils/DateTimeFormatter"
import { Note } from "../types"
import NoteView from "./NoteView"

const notes: Note = {
  id: 1,
  title: 'test title 1',
  body: 'test body 1',
  createdAt: '2022-12-07 23:26:49',
  updatedAt: '2022-12-11 22:55:56',
  formattedCreatedAt: formatDateTime(new Date('2022-12-07 23:26:49')),
  formattedUpdatedAt: formatDateTime(new Date('2022-12-11 22:55:56'))
}

describe('NoteView', () => {
  it('should show note data', () => {
    render(<NoteView selectedNote={notes} />)

    screen.getByText('test title 1')
    screen.getByText('test body 1')
  })
})