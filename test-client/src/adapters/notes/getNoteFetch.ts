import { formatDateTime } from '../../utils/DateTimeFormatter'
import { BackendNote } from '../FetchTypes'
import generalFetch from '../generalFetch'
import { visualizeUpdateAt } from './getNotesFetch'

const getNoteFetch = async ({...params}) => {
  const { id, abortController = null } = params

  try {
    const response: {
      data: BackendNote
    } =  await generalFetch({
      urn: `notes/${id}`,
      abortController
    })

    return {
      data: {
        note: {
          id: response.data.id,
          body: response.data.body,
          title: response.data.title,
          createdAt: response.data.createdAt,
          updatedAt: visualizeUpdateAt(response.data.createdAt, response.data.updatedAt),
          formattedCreatedAt: formatDateTime(new Date(response.data.createdAt)),
          formattedUpdatedAt: visualizeUpdateAt(
            formatDateTime(new Date(response.data.createdAt)),
            formatDateTime(new Date(response.data.updatedAt))
          )
        },
      },
      message: `Nota obtenida correctamente`
    }
  } catch (error: any) {
    throw new Error(error?.message || 'unknown', error)
  }

}

export default getNoteFetch
