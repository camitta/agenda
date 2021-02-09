const router = require('express').Router()
const {Board, User, Task, Mantra} = require('../db/models')
const {isLoggedInUser} = require('./routerMiddleware')

//GET api/boards/
//all boards and mantra
router.get('/', async (req, res, next) => {
  try {
    const {id} = req.user
    const boards = await Board.findAll({
      include: {
        model: User,
        where: {
          id
        }
      }
    })
    const mantras = await Mantra.findAll()
    res.send({boards, mantras})
  } catch (err) {
    next(err)
  }
})

router.get('/:boardId', isLoggedInUser, async (req, res, next) => {
  try {
    const {boardId: id} = req.params
    const board = await Board.findOne({
      where: {
        id
      },
      include: [
        // {
        //   model: Task
        // },
        {
          model: User
          // attributes: [],
          // required: true
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

//add new user to board
// api/boards/:boardId/add/user
router.put('/:boardId/add/user', async (req, res, next) => {
  try {
    const board = await Board.findOne({
      where: {
        id: req.params.boardId
      }
    })
    //our req.body.email will be the person being invited
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    if (user) {
      await board.addUser(user)
      res.sendStatus(204)
    } else if (!user) {
      res.status(404).send({error: 'error from add user'})
    }
  } catch (err) {
    next(err)
  }
})

// remove user from board
// api/boards/:boardId/delete/user
router.put('/:boardId/delete/user', async (req, res, next) => {
  try {
    const board = await Board.findOne({
      where: {
        id: req.params.boardId
      }
    })
    //our req.body.id will be the person being deleted
    const user = await User.findByPk(req.body.id)
    await board.removeUser(user)
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

module.exports = router
