import generalFetch from '../generalFetch'

export const messageDeletedSuccessfully = 'La nota ha sido eliminada con éxito'
const deleteNoteFetch = async ({...params}) => {
  const { id, abortController = null } = params

  try {
    await generalFetch({
      urn: `notes/${id}`,
      method: 'DELETE',
      abortController
    })

    return {
      data: { },
      message: 'La nota ha sido eliminada con éxito'
    }
  } catch (error: any) {
    throw new Error(error?.message || 'unknown', error)
  }

  
}

export default deleteNoteFetch
