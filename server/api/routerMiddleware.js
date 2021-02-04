const Board = require('../db/models/board')

//checks if current in user logged in
//checks if current user is the same one making the http request
const isLoggedInUser = async (req, res, next) => {
  const {id: userId} = req.user
  const {boardId} = req.params
  if (userId && boardId) {
    const board = await Board.findByPk(boardId)
    const userHasAccess = await board.hasUser(userId)
    if (userHasAccess) {
      next()
    } else {
      const err = new Error('Uh oh.')
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
