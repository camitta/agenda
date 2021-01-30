const router = require('express').Router()
const {Board, User} = require('../db/models')

//GET /boards

//GET api/boards/:boardId
router.get('/:boardId', async (req, res, next) => {
  try {
    if (req.user) {
      const board = await Board.findByPk(req.params.boardId)
      res.json(board)
    } else if (!req.user) {
      res.send(401)
    }
  } catch (err) {
    next(err)
  }
})

//create new board
// api/boards/
router.post('/', async (req, res, next) => {
  try {
    const currentUser = await User.findOne({
      where: {
        id: req.user.id
      }
    })
    const newBoard = await Board.create({
      name: req.body.name,
      type: req.body.type
    })
    await newBoard.setUser(currentUser)
    res.json(newBoard)
  } catch (err) {
    next(err)
  }
})

//update board
// api/boards/edit/:boardId
router.put('/edit/:boardId', async (req, res, next) => {
  try {
    const currentBoard = await Board.findByPk(req.params.boardId)
    await currentBoard.update(req.body)
    res.send(204).end()
  } catch (err) {
    next(err)
  }
})

//delete board
// api/boards/delete/:boardId
router.delete('/delete/:boardId', async (req, res, next) => {
  try {
    await Board.destroy({
      where: {
        id: req.params.boardId
      }
    })
    res.send(204).end()
  } catch (err) {
    next(err)
  }
})

module.exports = router
