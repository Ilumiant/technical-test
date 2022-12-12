const fs = require('node:fs')
const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const router = require('./src/router.js')
const path = require('node:path')

const app = express()

app.use(logger('common', {
  skip: function (req, res) { return res.statusCode < 400 },
  stream: fs.createWriteStream(path.resolve('src', 'logs', 'debug.log'), { flags: 'a' })
}))
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))
router(app)

module.exports = app
