const Board = require('../db/models/board')
const Task = require('../db/models/task')
const User = require('../db/models/user')

//checks if current in user logged in
//checks if current user is the same one making the http request
const isLoggedInUser = async (req, res, next) => {
  if (req.user) {
    const {id: userId} = req.user
    const {boardId, taskId} = req.params
    if (boardId) {
      const board = await Board.findByPk(boardId)
      const bool = await board.hasUser(userId)
      if (bool) {
        next()
      } else {
        const err = new Error('Access Denied.')
        err.status = 401
        next(err)
      }
    } else {
      const err = new Error('Board does not exist.')
      err.status = 401
      next(err)
    }
  } else {
    const err = new Error('Please log in.')
    err.status = 401
    next(err)
  }
}

//checks if current user is admin
const isAdmin = (req, res, next) => {
  const currentUser = req.user
  if (currentUser && currentUser.isAdmin) {
    next()
  } else {
    const err = new Error('Unauthorized credentials.')
    err.status = 403
    next(err)
  }
}

module.exports = {isLoggedInUser, isAdmin}
