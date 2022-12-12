const router = (app) => {
  const indexRouter = require('./routes/index')
  const notesRouter = require('./routes/notes')

  app.use('/', indexRouter)
  app.use('/notes', notesRouter)
}

module.exports = router
