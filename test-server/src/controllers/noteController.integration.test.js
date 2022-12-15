const request = require('supertest')
const { generateManyNotes, generateOneNote } = require('../database/fakes/noteFake')
const app = require('../../app')
const http = require('http')

const mockGetAll = jest.fn()
const mockGetOne = jest.fn()
const mockCreate = jest.fn()
const mockDelete = jest.fn()

jest.mock('../database/models', () => {
  return jest.fn().mockImplementation(() => {
    return {
      Note: {
        findAll: mockGetAll,
        findOne: mockGetOne,
        create: mockCreate,
        destroy: mockDelete
      }
    }
  })
})

describe('test controller', () => {
  let application = null
  let server = null
  beforeAll(() => {
    application = app
    server = http.createServer(application)
    server.listen(3001)
  })

  afterAll(async () => {
    await server.close()
  })

  it('should return a note list', async () => {
    // Arrange
    const fakeNotes = generateManyNotes(20)
    mockGetAll.mockResolvedValue(fakeNotes)
    // Act
    return request(application)
      .get('/notes')
      .expect(200)
      .then(({ body }) => {
        // Assert
        expect(body.error).toBe(false)
        expect(body.data.length).toEqual(fakeNotes.length)
      })
  })

  it('should return a note list', async () => {
    // Arrange
    const fakeNote = generateOneNote()
    mockGetOne.mockResolvedValue({
      dataValues: fakeNote
    })
    // Act
    return request(application)
      .get(`/notes/${fakeNote.id}`)
      .expect(200)
      .then(({ body }) => {
        // Assert
        expect(body.error).toBe(false)
        expect(body.data.id).toEqual(fakeNote.id)
        expect(body.data.title).toEqual(fakeNote.title)
        expect(body.data.body).toEqual(fakeNote.body)
      })
  })
})
