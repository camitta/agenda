const Sequelize = require('sequelize')
const db = require('../db')

const Task = db.define('task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  dueDate: {
    type: Sequelize.DATE
  },
  type: {
    type: Sequelize.ENUM('todo', 'inprogress', 'done'),
    allowNull: false
  },
  label: {
    type: Sequelize.ENUM('red', 'orange', 'yellow', 'green', 'blue', 'purple')
  }
})

module.exports = Task
