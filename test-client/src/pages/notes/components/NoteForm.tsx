import { useEffect } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { BackendNote } from "../../../adapters/FetchTypes"
import createNoteFetch from "../../../adapters/notes/createNoteFetch"
import updateNoteFetch from "../../../adapters/notes/updateNoteFetch"
import { showSwalErrorMessage, showSwalSuccessMessage } from "../../../App"
import { Button } from "../../../components/form/Button"

type Props = {
  didSaveForm?: () => void,
  selectedNote?: BackendNote
}
type FormValues = {
  title: string,
  body: string
}

enum ButtonText {
  Create = "Crear",
  Update = "Actualizar"
}

export const NoteForm = ({ didSaveForm, selectedNote }: Props) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>()
  
  useEffect(() => {
    if (selectedNote) {
      setValue('title', selectedNote.title)
      setValue('body', selectedNote.body)
    }
  }, [selectedNote, setValue])

  const getSubmitButtonText = (): ButtonText => 
    selectedNote ? ButtonText.Update : ButtonText.Create
  
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = JSON.stringify(data)
    try {
      if (selectedNote) {
        await updateNoteFetch({id: selectedNote.id, formData})
      } else {
        await createNoteFetch({formData})
      }
      showSwalSuccessMessage('La nota fue guardada correctamente', 'Éxito')
      if (didSaveForm) didSaveForm()
    } catch (error: any) {
      showSwalErrorMessage('Error al crear una nota')
      throw new Error(error)
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="note-form-title" className="label">Título</label>
        <input id="note-form-title" className="input-text" {...register("title", { required: true })} maxLength={50} />
        {errors.title && <span className="input-help">El título es requerido</span>}
      </div>

      <div className="form-group">
        <label htmlFor="note-form-body" className="label">Cuerpo</label>
        <textarea id="note-form-body" className="input-text" {...register("body", { required: true })} rows={4} maxLength={250} />
        {errors.body && <span className="input-help">El cuerpo es requerido</span>}
      </div>
      
      <Button type="submit">
        {getSubmitButtonText()}
      </Button>
    </form>
  )
}
