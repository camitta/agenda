const User = require('./user')
const Board = require('./board')
const ChecklistItem = require('./checklist-item')
const Mantra = require('./mantra')
const Task = require('./Task')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.belongsToMany(Board, {through: 'userBoard'})
Board.belongsToMany(User, {through: 'userBoard'})

User.hasMany(ChecklistItem)
ChecklistItem.belongsTo(User)

Board.hasMany(Task)
Task.belongsTo(Board)

User.belongsToMany(Task, {through: 'userTask'})
Task.belongsToMany(User, {through: 'userTask'})

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Board,
  ChecklistItem,
  Mantra,
  Task
}
