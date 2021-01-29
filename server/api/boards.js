const router = require('express').Router()
const {Board, User} = require('./db/models')
module.exports = router

//GET /boards

//GET api/boards/:boardId
router.get('/:boardId', async (req, res, next) => {
  try {
    if (req.user) {
      const board = await Board.findOne({
        where: {
          userId: req.user.id
        },
        include: {model: Task}
      })
      if (board) {
        const task = await Task.findAll({
          where: {
            boardId: board.id
          }
        })
        res.json(task)
      }
    } else if (!req.user) {
      res.send(401)
    }
  } catch (err) {
    next(err)
  }
})
