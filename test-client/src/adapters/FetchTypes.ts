
type GetFetch = {
  abortController?: AbortController | null
}

type GetOneFetch = {
  id: number | string,
  abortController?: AbortController | null
}

type PostFetch = {
  abortController?: AbortController | null,
  formData: FormData | string
}

type PutFetch = {
  abortController?: AbortController | null,
  id: number | string,
  formData: FormData | string
}

export type BackendNote = {
  id: number,
  title: string,
  body: string,
  createdAt: string,
  updatedAt: string,
}

export type {
  GetFetch,
  GetOneFetch,
  PostFetch,
  PutFetch
}
