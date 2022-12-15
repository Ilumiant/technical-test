import { Note } from '../../pages/notes/types'
import { formatDateTime } from '../../utils/DateTimeFormatter'
import { BackendNote, GetFetch } from '../FetchTypes'
import generalFetch from '../generalFetch'

export type ResponseGetNotesFetch = {
  data: {
    notes: Note[]
  },
  message: string
}

export function visualizeUpdateAt(createdAt: string, updatedAt: string) {
  return createdAt === updatedAt ? '' : updatedAt
}

const getNotesFetch = async (params?: GetFetch): Promise<ResponseGetNotesFetch> => {
  const abortController = params?.abortController || null

  try {
    const response =  await generalFetch({
      urn: 'notes',
      abortController
    })

    return {
      data: {
        notes: response.data.map((note: BackendNote): Note => {
          return ({
            id: note.id,
            body: note.body,
            title: note.title,
            createdAt: note.createdAt,
            updatedAt: visualizeUpdateAt(note.createdAt, note.updatedAt),
            formattedCreatedAt: formatDateTime(new Date(note.createdAt)),
            formattedUpdatedAt: visualizeUpdateAt(
              formatDateTime(new Date(note.createdAt)),
              formatDateTime(new Date(note.updatedAt))
            )
          })
        }),
      },
      message: 'Apartmentos obtenidos correctamente'
    }
  } catch (error: any) {
    throw new Error(error)
  }
  
}

export default getNotesFetch
