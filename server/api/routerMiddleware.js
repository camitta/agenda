const {Board, Task} = require('../db/models')

//checks if current in user logged in
//checks if current user is the same one making the http request

const isLoggedInUser = async (req, res, next) => {
  const {id: userId} = req.user
  const {boardId, taskId} = req.params
  if (!userId) {
    const err = new Error('Please log in.')
    err.status = 401
    next(err)
  } else {
    let userHasAccess
    if (boardId) {
      const board = await Board.findByPk(boardId)
      userHasAccess = await board.hasUser(userId)
    } else if (taskId) {
      const task = await Task.findByPk(taskId)
      userHasAccess = await task.hasUser(userId)
    }
    if (userHasAccess) {
      next()
    } else {
      const err = new Error('Uh oh.')
      res.status(401).send(err)
    }
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
