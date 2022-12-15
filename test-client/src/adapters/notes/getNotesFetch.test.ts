import { BackendNote } from '../FetchTypes'
import getNotesFetch from './getNotesFetch'

const notes: BackendNote[] = [{
  id: 1,
  title: 'test title',
  body: 'test body',
  createdAt: '2022-12-07 23:26:49',
  updatedAt: '2022-12-11 22:55:56'
}]

jest.mock("../generalFetch", () => () => Promise.resolve({ data: notes }))

describe('Fetch to delete Note', () => {
  it('should be a function', () => {
    expect(typeof getNotesFetch).toBe('function')
  })

  it('should return a success message', async () => {
    
    const response = await getNotesFetch()
    expect(response.data.notes.length).toBe(notes.length)
  })

})