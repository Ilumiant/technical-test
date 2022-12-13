import { useState } from 'react'
import { Modal } from '../../components/Modal';
import { Navbar } from '../../components/Navbar';
import { useNotes } from './hooks/useNotes';
import { NoteForm } from './componets/NoteForm';
import { NoteList } from './componets/NoteList';
import { Button } from '../../components/form/Button';
import { getNoteFetch } from '../../adapters/notes/getNoteFetch';
import { BackendNote } from '../../adapters/FetchTypes';

export const NotePage = () => {
  const [isShownModal, setIsShownModal] = useState(false)
  const [notes, reloadNotes] = useNotes()
  const [selectedNote, setSelectedNote] = useState<BackendNote | null>(null)

  function hideModal() {
    setIsShownModal(false)
    reloadNotes()
  }

  function showModal() {
    setIsShownModal(true)
  }

  function createNote() {
    setSelectedNote(null)
    showModal()
  }

  async function editNote(id: number | string): Promise<void> {
    const response = await getNoteFetch({ id })
    console.log(response.data.note)
    setSelectedNote(response.data.note)
    showModal()
  }

  return (
    <>
      <Navbar />
      <div className='mt-1 mb-1'>
        <Button
          onClick={() => { createNote() }}
        >
          Crear Nota
        </Button>
      </div>
      <NoteList notes={notes} editNote={editNote} />
      <Modal 
        isShownModal={isShownModal}
        hideModal={hideModal}
        title="Formulario de Notas"
      >
        {selectedNote ? (<NoteForm selectedNote={selectedNote} />) : (<NoteForm />)}
      </Modal>
    </>
  )
}
