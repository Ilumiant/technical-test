const express = require('express')
const {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote
} = require('../controllers/noteController')
const router = express.Router()

/* GET users listing. */
router.get('/', getNotes)

router.get('/:id', getNote)

router.post('/', createNote)

router.put('/:id', updateNote)

router.delete('/:id', deleteNote)

module.exports = router
