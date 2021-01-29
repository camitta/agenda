const Sequelize = require('sequelize')
const db = require('../db')

const Mantra = db.define('mantra', {
  mantra: Sequelize.STRING
})

module.exports = Mantra
