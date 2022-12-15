import { Fragment, useState } from 'react'
import { Modal } from '../../components/Modal'
import { Navbar } from '../../components/Navbar'
import { useNotes } from './hooks/useNotes'
import { NoteForm } from './components/NoteForm'
import { NoteList } from './components/NoteList'
import { Button } from '../../components/form/Button'
import getNoteFetch from '../../adapters/notes/getNoteFetch'
import { ActionNote, Note } from './types'
import NoteView from './components/NoteView'
import { showSwalErrorMessage, showSwalSuccessMessage, showSwalTwoOptions } from '../../App'
import deleteNoteFetch from '../../adapters/notes/deleteNoteFetch'

export const NotePage = () => {
  const [isShownModal, setIsShownModal] = useState(false)
  const [notes, reloadNotes] = useNotes()
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [actionNote, setActionNote] = useState<number | null>()
  
  function hideModal() {
    setIsShownModal(false)
    reloadNotes()
  }

  function showModal() {
    setIsShownModal(true)
  }

  function getErrorMessage(action: string) {
    return 'Ha ocurrido un error al intentar ' + action +
    ' la nota, refresque la tabla e intente nuevamente'
  }

  function createNote() {
    setActionNote(ActionNote.CreateNote)
    setSelectedNote(null)
    showModal()
  }

  async function showNote(id: number | string): Promise<void> {
    try {
      setActionNote(ActionNote.ShowNote)
      const response = await getNoteFetch({ id })
      setSelectedNote(response.data.note)
      showModal()
    } catch (error) {
      showSwalErrorMessage(getErrorMessage('mostrar'))
    }
  }

  async function editNote(id: number | string): Promise<void> {
    try {
      setActionNote(ActionNote.EditNote)
      const response = await getNoteFetch({ id })
      setSelectedNote(response.data.note)
      showModal()
    } catch (error) {
      showSwalErrorMessage(getErrorMessage('editar'))
    }
  }

  async function deleteNote(note: Note): Promise<void> {
    const result = await showSwalTwoOptions(
      'Eliminar nota',
      `¿Está seguro de elminar la nota "${note.title}"?`,
      'question',
      'Eliminar'
    )
    
    if (result.isConfirmed) {
      try {
        const { message } = await deleteNoteFetch({ id: note.id})
        showSwalSuccessMessage(message)
        reloadNotes()
      } catch (error) {
        showSwalErrorMessage(getErrorMessage('eliminar'))
      }
    }
  }

  function getModalName() {
    if (actionNote === ActionNote.ShowNote) {
      return 'Mostrar nota'
    } else if(actionNote === ActionNote.CreateNote) {
      return 'Crear nota'
    } else if (actionNote === ActionNote.EditNote && selectedNote) {
      return 'Editar nota'
    } else {
      return ''
    }
  }

  function ModalContent({ ...props }) {
    if (actionNote === ActionNote.ShowNote && selectedNote) {
      return <NoteView {...props} selectedNote={selectedNote} />
    } else if(actionNote === ActionNote.CreateNote) {
      return <NoteForm {...props} />
    } else if (actionNote === ActionNote.EditNote && selectedNote) {
      return <NoteForm {...props} selectedNote={selectedNote} />
    } else {
      hideModal()
      return <Fragment></Fragment>
    }
  }

  return (
    <div className='note-page'>
      <Navbar />
      <div className='note-page-buttons'>
        <Button variant='primary'
          onClick={() => { reloadNotes() }}
        >
          Refrescar tabla
        </Button>
        <Button
          onClick={() => { createNote() }}
        >
          Crear nota
        </Button>
      </div>
      <NoteList notes={notes} showNote={showNote} editNote={editNote} deleteNote={deleteNote} />
      <Modal 
        isShownModal={isShownModal}
        hideModal={hideModal}
        title={getModalName()}
      >
        <ModalContent />
      </Modal>
    </div>
  )
}
