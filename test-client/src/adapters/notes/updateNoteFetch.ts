import { PutFetch } from "../FetchTypes"
import generalFetch from "../generalFetch"

const updateNoteFetch = async (params: PutFetch) => {
  const { id, formData, abortController = null } = params

  try {
    const response =  await generalFetch({
      urn: `notes/${id}`,
      method: 'PUT',
      body: formData,
      abortController
    })

    return {
      data: {
        note: response.data
      },
      message: response.message
    }
  } catch (error: any) {
    throw new Error(error?.message || 'unknown', error)
  }

  
}

export default updateNoteFetch