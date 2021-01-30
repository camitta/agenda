const router = require('express').Router()
const {Board, User, Task} = require('../db/models')
module.exports = router

//GET /boards
//board has tasks
//user has tasks
//get user tasks that have the board id

//GET api/boards/:boardId
router.get('/:boardId', async (req, res, next) => {
  console.log('!!!!!!!!', req.params)
  try {
    if (req.user) {
      const user = await User.findByPk(req.params.userId)
      const tasks = await Task.findAll({
        where: {
          taskId: req.params.userId
        }
      })
      if (board) {
        const task = await Task.findAll({
          where: {
            boardId: board.id
          }
        })
        res.json(tasks)
      }
    } else if (!req.user) {
      res.send(401)
    }
  } catch (err) {
    next(err)
  }
})
