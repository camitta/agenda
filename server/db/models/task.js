const Sequelize = require('sequelize')
const db = require('../db')

const Task = db.define('task', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  dueDate: {
    type: Sequelize.DATE
  },
  type: {
    type: Sequelize.ENUM('todo', 'inprogress', 'done'),
    allowNull: false
  },
  label: {
    type: Sequelize.ENUM('red', 'orange', 'yellow', 'pink', 'purple', '')
  },
  index: {
    type: Sequelize.INTEGER
  }
})

module.exports = Task
