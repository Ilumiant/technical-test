const { generateManyNotes, generateOneNote } = require('../database/fakes/noteFake')
const NoteService = require('./NoteService')

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

describe('Test for NoteService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('test for get all Notes', () => {
    it('should return a note list', async () => {
      // Arrange
      const fakeNotes = generateManyNotes(20)
      mockGetAll.mockResolvedValue(fakeNotes)
      // Act
      const notes = await NoteService.getAll()
      // Assert
      expect(notes.length).toEqual(fakeNotes.length)
      expect(mockGetAll).toHaveBeenCalled()
      expect(mockGetAll).toHaveBeenCalledTimes(1)
      expect(notes[0].title).toEqual(fakeNotes[0].title)
    })

    describe('test for get one note', () => {
      it('should return a note', async () => {
        // Arrange
        const fakeNote = generateOneNote()
        mockGetOne.mockResolvedValue({
          dataValues: fakeNote
        })
        // Act
        const { data: note } = await NoteService.get(fakeNote.id)
        console.log({ note })
        // Assert
        expect(note.title).toEqual(fakeNote.title)
        expect(note.body).toEqual(fakeNote.body)
      })

      it('should return an error', async () => {
        // Arrange
        const fakeNote = generateOneNote()
        mockGetOne.mockRejectedValue(
          new Error()
        )
        // Act
        const { error } = await NoteService.get(fakeNote.id)
        // Assert
        expect(error).toEqual(true)
      })
    })

    describe('test for create notes', () => {
      it('should create a note', async () => {
        // Arrange
        const fakeNote = generateOneNote()
        const { id, title, body } = fakeNote
        mockCreate.mockResolvedValue({
          dataValues: fakeNote
        })
        // Act
        const { data: note } = await NoteService.create({ title, body })
        // Assert
        expect(note.title).toEqual(title)
        expect(note.body).toEqual(body)
        expect(note.id).toEqual(id)
      })

      it('should create a note', async () => {
        // Arrange
        const fakeNote = generateOneNote()
        mockCreate.mockRejectedValue(
          new Error()
        )
        // Act
        const { error } = await NoteService.get(fakeNote.id)
        // Assert
        expect(error).toEqual(true)
      })
    })

    it('should update a note', async () => {
      // Arrange
      const fakeNote = generateOneNote()
      const { id, title, body } = fakeNote
      mockGetOne.mockResolvedValue({
        dataValues: fakeNote,
        save: () => {}
      })
      // Act
      const { data: note } = await NoteService.update(id, { title, body })
      // Assert
      expect(note.title).toEqual(fakeNote.title)
      expect(note.body).toEqual(fakeNote.body)
      expect(note.id).toEqual(id)
    })

    it('should delete a note', async () => {
      // Arrange
      const fakeNote = generateOneNote()
      mockDelete.mockResolvedValue(1)
      // Act
      const { data } = await NoteService.destroy(fakeNote.id)
      // Assert
      expect(data).toBeNull()
    })
  })
})
