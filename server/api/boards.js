const router = require('express').Router()
const {Board, User, Task, Mantra} = require('../db/models')

//GET all boards AND mantras to display
router.get('/', async (req, res, next) => {
  try {
    const userId = req.user.id
    const boards = await Board.findAll({
      include: {
        model: User,
        where: {
          id: userId
        }
      }
    })
    const mantras = await Mantra.findAll()
    res.send({boards, mantras})
  } catch (err) {
    next(err)
  }
})

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
          model: Task
        },
        {
          model: User,
          // attributes: [],
          // through: {
          //   where: {
          //     userId
          //   }
          // },
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
      res.send(204).end()
    } else if (!user) {
      // for now if the person's email entered is not signed up on our site, send a 404 'Not found' error. We will need to add this in the front end component so the user inviting their friend knows why the invite is not working
      res.send(404)
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
