import deleteNoteFetch from './deleteNoteFetch'

const messageDeletedSuccessfully = 'La nota ha sido eliminada con éxito'

jest.mock("../generalFetch", () => () => Promise.resolve({ message: messageDeletedSuccessfully}))

describe('Fetch to delete Note', () => {
  it('should be a function', () => {
    expect(typeof deleteNoteFetch).toBe('function')
  })

  it('should return a success message', async () => {
    const response = await deleteNoteFetch({
      id: 1
    })
    expect(response.message).toBe(messageDeletedSuccessfully)
  })

})