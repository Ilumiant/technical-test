import { useEffect, useState } from 'react'
import getNotesFetch, { ResponseGetNotesFetch } from '../../../adapters/notes/getNotesFetch'
import { Note } from '../types'

type UseNotesReturn = [
  Note[],
  (abortController?: AbortController | null) => void,
  boolean
]

export const useNotes = (): UseNotesReturn => {

  const [notes, setNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function reload(abortController: AbortController | null = null) {
    try {
      setIsLoading(true)
      const response = await getNotesFetch({ abortController })
      const notes = response.data.notes
      setNotes(notes)
      setIsLoading(false)
    } catch (error: any) {
      console.error(error.message)
    }
  }

  useEffect(() => {
    setIsLoading(true)
    const abortController = new AbortController()
    const fetchData = async () => {
      try {
        const response: ResponseGetNotesFetch = await getNotesFetch({ abortController })
        const notes = response.data.notes
        setNotes(notes)
        setIsLoading(false)
      } catch (error: any) {
        console.error(error.message)
      }
    }

    fetchData()

    return () => {
      abortController.abort()
    }
  }, [])

  return [notes, reload, isLoading]
}
