import { PostFetch } from "../FetchTypes"
import generalFetch from "../generalFetch"

export type ResponseCreateNoteFetch = {
  data: {
    created: string
  },
  message: string
}

const createNoteFetch = async (params: PostFetch): Promise<ResponseCreateNoteFetch> => {
  const abortController = params?.abortController || null
  const formData = params.formData

  try {
    const response =  await generalFetch({
      urn: 'notes',
      method: 'POST',
      body: formData,
      abortController
    })

    return {
      data: {
        created: response.message
      },
      message: response.message
    }
  } catch (error: any) {
    throw new Error(error?.message || 'unknown', error)
  }

  
}

export default createNoteFetch