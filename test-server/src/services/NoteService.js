const Models = require('../database/models')
const log = require('../logs/log')

const NoteService = {
  getAll: async () => {
    try {
      const notes = await Models().Note.findAll()
      return notes
    } catch (error) {
      log.error(error)
    }
  },
  get: async (id) => {
    try {
      const note = await Models().Note.findOne({ where: { id } })
      if (!note) {
        return {
          error: true,
          message: 'Note not found'
        }
      }
      return {
        error: false,
        message: 'Note found',
        data: note.dataValues
      }
    } catch (error) {
      log.error(error)
      return {
        error: true,
        message: 'Note could not be found'
      }
    }
  },
  create: async ({ title, body }) => {
    try {
      const note = await Models().Note.create({ title, body })
      return {
        error: false,
        message: 'Note has been created successfully',
        data: note.dataValues
      }
    } catch (error) {
      log.error(error)
      return {
        error: true,
        message: 'Note cannot be created'
      }
    }
  },
  update: async (id, { title, body }) => {
    try {
      const note = await Models().Note.findOne({ where: { id } })
      if (title) note.title = title
      if (body) note.body = body
      note.save()
      console.log({ note })
      return {
        error: false,
        message: 'Note has been updated successfully',
        data: note.dataValues
      }
    } catch (error) {
      log.error(error)
      return {
        error: true,
        message: 'Note cannot be updated'
      }
    }
  },
  destroy: async (id) => {
    try {
      const result = await Models().Note.destroy({ where: { id } })
      if (result) {
        return {
          error: false,
          message: 'Note has been deleted successfully',
          data: null
        }
      } else {
        return {
          error: false,
          message: 'Note already had been deleted',
          data: null
        }
      }
    } catch (error) {
      log.error(error)
      return {
        error: true,
        message: 'Note cannot be deleted'
      }
    }
  }
}

module.exports = NoteService
