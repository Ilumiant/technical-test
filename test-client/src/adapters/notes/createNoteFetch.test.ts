import createNoteFetch from './createNoteFetch'

const messageCreatedSuccessfully = 'Note created successfully'

jest.mock("../generalFetch", () => () => Promise.resolve({ message: messageCreatedSuccessfully }))

describe('Fetch to create Note', () => {
  it('should be a function', () => {
    expect(typeof createNoteFetch).toBe('function')
  })

  it('should return a success message', async () => {
    const response = await createNoteFetch({
      formData: JSON.stringify({ title: 'test title', body: 'test body'})
    })
    expect(response.message).toBe(messageCreatedSuccessfully)
  })


})