const router = require('express').Router()
const {Board, User, Task} = require('../db/models')

//GET /boards

//GET api/boards/:boardId
router.get('/:boardId', async (req, res, next) => {
  try {
    const userId = req.user.id
    const {boardId} = req.params
    const board = await Board.findOne({
      where: {
        id: boardId
      },
      include: [
        {
          model: Task,
          where: {
            boardId
          }
        },
        {
          model: User,
          attributes: [],
          through: {
            where: {
              userId
            }
          },
          required: true
        }
      ]
    })
    if (!board) return res.sendStatus(404)
    res.send(board)
  } catch (err) {
    next(err)
  }
})

//create new board
// api/boards/
router.post('/', async (req, res, next) => {
  try {
    const {name, type} = req.body
    const userId = req.user.id
    const currentUser = await User.findByPk(userId)
    const newBoard = await Board.create({name, type})
    await newBoard.addUser(currentUser)
    res.send(newBoard)
  } catch (err) {
    next(err)
  }
})

//update board
// api/boards/edit/:boardId
router.put('/edit/:boardId', async (req, res, next) => {
  try {
    const userId = req.user.id
    const {boardId} = req.params
    const updated = await Board.update(req.body, {
      returning: true,
      where: {
        id: boardId
      },
      include: [
        {
          model: User,
          attributes: [],
          through: {
            where: {
              userId
            }
          },
          required: true
        }
      ]
    })
    if (updated.length !== 2) {
      return res.sendStatus(404)
    }
    const [numUpdated, [updatedBoard]] = updated
    res.send(updatedBoard)
  } catch (err) {
    next(err)
  }
})

//delete board
// api/boards/delete/:boardId
router.delete('/delete/:boardId', async (req, res, next) => {
  try {
    const userId = req.user.id
    const {boardId} = req.params
    await Board.destroy({
      where: {
        id: boardId
      },
      include: [
        {
          model: User,
          attributes: [],
          through: {
            where: {
              userId
            }
          },
          required: true
        }
      ]
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

module.exports = router
