const { errorTypes } = require('../services/ErrorTypes')
const NoteService = require('../services/NoteService')

async function getNotes (_, res) {
  const notes = await NoteService.getAll()
  return res.status(200).json(notes)
}

async function getNote (req, res) {
  const { id } = req.params
  const {
    error,
    errorType,
    message,
    data
  } = await NoteService.get(id)
  if (error) {
    if (errorType === errorTypes.NotFound) {
      return res.status(404).json({ error, messages: [message] })
    } else {
      return res.status(500).json({ error, messages: [message] })
    }
  }
  return res.status(200).json({ error, messages: [message], data })
}

async function createNote (req, res) {
  const { title, body } = req.body
  const messages = []
  if (!title) messages.push('title is required')
  if (!body) messages.push('body is required')
  if (messages.length) {
    return res.status(422).json({ error: true, messages })
  }
  const {
    error,
    message,
    data
  } = await NoteService.create({ title, body })
  if (error) {
    return res.status(500).json({ error, messages: [message] })
  }
  return res.status(200).json({ error, messages: [message], data })
}

async function updateNote (req, res) {
  const { id } = req.params
  const { title, body } = req.body
  const updateData = {}
  if (title) updateData.title = title
  if (body) updateData.body = body
  const {
    error,
    errorType,
    message,
    data
  } = await NoteService.update(id, { title, body })
  if (error) {
    if (errorType === errorTypes.NotFound) {
      return res.status(404).json({ error, messages: [message] })
    } else {
      return res.status(500).json({ error, messages: [message] })
    }
  }
  return res.status(200).json({ error, messages: [message], data })
}

async function deleteNote (req, res) {
  const { id } = req.params
  const {
    error,
    message,
    data
  } = await NoteService.destroy(id)
  if (error) {
    return res.status(404).json({ error, messages: [message] })
  }
  return res.status(200).json({ error, messages: [message], data })
}

module.exports = {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote
}
