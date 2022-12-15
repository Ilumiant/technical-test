import { render, screen, waitFor } from '@testing-library/react'
import { formatDateTime } from '../../../utils/DateTimeFormatter'
import { Note } from '../types'
import { NoteList } from './NoteList'

const showNote = jest.fn()
const editNote = jest.fn()
const deleteNote = jest.fn()

describe('NoteList', () => {

  const notes: Note[] = Array(20).fill(0).map((_, index) : Note => {
    const id = index + 1
    const createdAt = '2022-12-07 23:26:49'
    const updatedAt = '2022-12-11 22:55:56'
    return {
      id: id,
      title: 'test title '.concat(`${id}`),
      body: 'test body'.concat(`${id}`),
      createdAt: createdAt,
      updatedAt: updatedAt,
      formattedCreatedAt: formatDateTime(new Date('2022-12-07 23:26:49')),
      formattedUpdatedAt: formatDateTime(new Date('2022-12-11 22:55:56'))
    }
  })

  it('should render', async () => {
    render(<NoteList notes={notes} showNote={showNote} editNote={editNote} deleteNote={deleteNote} />)
  })

  it('should show same quantiiy of elements', async () => {
    render(<NoteList notes={notes} showNote={showNote} editNote={editNote} deleteNote={deleteNote} />)

    await waitFor(async () => {
      const rows = await screen.findAllByRole('row')
      const headerLength = 1
      const expectedRows = notes.length + headerLength
      expect(rows.length).toBe(expectedRows)
    })

  })

})