import { API_HOST } from '../constants'
type GeneralFetchOptions = {
  urn: string,
  method?: string,
  body?: FormData | string | null,
  headers?: any | null,
  abortController?: AbortController | null
}

type FetchOptions = {
  method: string,
  headers: any,
  signal: AbortSignal,
  body?: FormData | string
}

const generalFetch = async ({
  urn,
  method = 'GET',
  body = null,
  headers = null,
  abortController = null
}: GeneralFetchOptions) => {
  if (typeof urn !== 'string')
    throw new Error('urn param is required')
  if (abortController !== null && !(abortController instanceof AbortController))
    throw new Error('abortController can be only null or an instance of AbortController class')

  const paramHeaders = headers ? headers : {}
  if (!paramHeaders['Content-Type']) paramHeaders['Content-Type'] = "application/json"
  if (urn.startsWith('/')) urn = urn.substring(1)

  const options: FetchOptions = {
    method,
    headers: paramHeaders,
    signal: abortController ? abortController.signal : (new AbortController()).signal
  }

  if (body) 
    options.body = body

    const response = await fetch(`${API_HOST}/${urn}`, options)
    let responseJson = null
    try {
      responseJson = await response.json()
      if (response.ok) {
        return responseJson
      }
    } catch (error) {
      if (response.status === 404) {
        if (error instanceof DOMException) {
          throw new Error(response.statusText, error)
        } else {
          throw new Error(response.statusText)
        }
      }

      try {
        responseJson = await response.text()
      } catch (error) {
        throw new Error(response.statusText)
      }
    }

    if (responseJson.message) {
      throw new Error(responseJson.message)
    } else {
      throw new Error(response.statusText)
    }

}

export default generalFetch