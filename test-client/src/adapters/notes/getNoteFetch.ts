import { formatDateTime } from '../../utils/DateTimeFormatter'
import { BackendNote } from '../FetchTypes'
import generalFetch from '../generalFetch'

export const getNoteFetch = async ({...params}) => {
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
          updatedAt: response.data.updatedAt,
          formattedCreatedAt: formatDateTime(new Date(response.data.createdAt)),
          formattedUpdatedAt: formatDateTime(new Date(response.data.updatedAt))
        },
      },
      message: `Nota obtenida correctamente`
    }
  } catch (error: any) {
    console.log({error});
    throw new Error(error?.message || 'unknown', error)
  }

  
}
