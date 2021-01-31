const router = require('express').Router()
const {Board, User} = require('../db/models')

//GET /boards

//GET api/boards/:boardId
router.get('/:boardId', async (req, res, next) => {
  try {
    if (req.user) {
      const board = await Board.findByPk(req.params.boardId, {
        include: User
      })
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
