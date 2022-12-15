import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { NoteForm } from './NoteForm'

const messageCreatedSuccessfully = 'Note created successfully'

jest.mock("../../../adapters/generalFetch", () => () => Promise.resolve({ message: messageCreatedSuccessfully }))

const didSaveForm = jest.fn()

describe('NoteForm', () => {
  it('should render', () => {
    render(<NoteForm />)
  })

  it('should render labels for inputs', () => {
    render(<NoteForm />)

    screen.getByText('Título')
    screen.getByText('Cuerpo')
  })

  it('should execute didSaveForm function', async () => {
    render(<NoteForm didSaveForm={didSaveForm} />)

    const titleInput = screen.getByLabelText('Título') as HTMLInputElement
    const bodyInput = screen.getByLabelText('Cuerpo') as HTMLTextAreaElement
    const submitButton = screen.getByText('Crear')

    fireEvent.change(titleInput, { target: { value: 'test title'}})
    expect(titleInput.value).toBe('test title')
    
    fireEvent.change(bodyInput, { target: { value: 'test body'}})
    expect(bodyInput.value).toBe('test body')

    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(didSaveForm).toBeCalledTimes(1)
    })

  })
})