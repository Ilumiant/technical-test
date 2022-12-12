const fs = require('fs')
const path = require('node:path')
const util = require('node:util')
const logFile = fs.createWriteStream(path.resolve('src', 'logs', 'debug.log'), { flags: 'w' })
const logStdout = process.stdout

function saveLog (message) {
  logFile.write(util.format(message) + '\n')
  logStdout.write(util.format(message) + '\n')
}

function getFormattedDescription (description) {
  try {
    return typeof description === 'object'
      ? JSON.stringify(description, null, 2)
      : description
  } catch (error) {
    return 'Error to log'
  }
}

const log = {
  info: (description) => {
    const infoTilte = 'INFO: \n'
    const formattedDescription = getFormattedDescription(description)
    saveLog(infoTilte.concat(formattedDescription))
  },
  warning: (description) => {
    const warningTilte = 'WARNING: \n'
    const formattedDescription = getFormattedDescription(description)
    saveLog(warningTilte.concat(formattedDescription))
  },
  error: (description) => {
    const errorTilte = 'ERROR: \n'
    const formattedDescription = getFormattedDescription(description)
    saveLog(errorTilte.concat(formattedDescription))
  }
}

module.exports = log
