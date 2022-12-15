const Models = require('../database/models')
const log = require('../logs/log')
const { errorTypes } = require('./ErrorTypes')

const serverErrorMessage = 'Internal server error'

const NoteService = {
  getAll: async () => {
    try {
      const notes = await Models().Note.findAll()
      return {
        error: false,
        message: 'Note found',
        data: notes
      }
    } catch (error) {
      log.error(error)
      return {
        error: true,
        errorType: errorTypes.ServerError,
        message: serverErrorMessage
      }
    }
  },
  get: async (id) => {
    try {
      const note = await Models().Note.findOne({ where: { id } })
      if (!note) {
        return {
          error: true,
          errorType: errorTypes.NotFound,
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
        errorType: errorTypes.ServerError,
        message: serverErrorMessage
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
        errorType: errorTypes.ServerError,
        message: serverErrorMessage
      }
    }
  },
  update: async (id, { title, body }) => {
    try {
      const note = await Models().Note.findOne({ where: { id } })
      if (!note) {
        return {
          error: true,
          errorType: errorTypes.NotFound,
          message: 'Note not found'
        }
      }
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
        errorType: errorTypes.ServerError,
        message: serverErrorMessage
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
        errorType: errorTypes.ServerError,
        message: serverErrorMessage
      }
    }
  }
}

module.exports = NoteService
