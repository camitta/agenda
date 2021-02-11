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
    //                        red,     orange,    yellow,    pink,     purple
    type: Sequelize.ENUM(
      '#EE7674',
      '#FDC577',
      '#F0E76A',
      '#FF85A1',
      '#B681D9',
      ''
    )
  },
  index: {
    type: Sequelize.INTEGER
  }
})

module.exports = Task
