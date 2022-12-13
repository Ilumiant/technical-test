const path = require('path')
const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require(path.resolve(__dirname, '../../config/config.js'))[env]
const Note = require('./note')

const sequelize = new Sequelize(config.database, config.username, config.password, config)

const models = {
  Note: Note(sequelize, Sequelize.DataTypes)
}

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

models.sequelize = sequelize
models.Sequelize = Sequelize
module.exports = () => models
