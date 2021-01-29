const Sequelize = require('sequelize')
const db = require('../db')

const ChecklistItem = db.define('checklist-item', {
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [1, 150]
    }
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = ChecklistItem
