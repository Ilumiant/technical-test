import { BackendNote } from '../FetchTypes'
import getNoteFetch from './getNoteFetch'

const note: BackendNote = {
  id: 1,
  title: 'test title',
  body: 'test body',
  createdAt: '2022-12-07 23:26:49',
  updatedAt: '2022-12-11 22:55:56'
}

jest.mock("../generalFetch", () => () => Promise.resolve({ data: note }))

describe('Fetch to delete Note', () => {
  it('should be a function', () => {
    expect(typeof getNoteFetch).toBe('function')
  })

  it('should return a success message', async () => {
    
    const response = await getNoteFetch({
      id: note.id
    })
    expect(response.data.note.title).toBe(note.title)
  })

})