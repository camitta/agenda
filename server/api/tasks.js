const router = require('express').Router()
const {Task, Board, User} = require('../db/models')

const isLoggedIn = (req, res, next) =>
  req.user.isLoggedIn ? next() : res.send('None shall pass!')

//get new single task
//api/tasks/:taskId

router.get('/:taskId', async (req, res, next) => {
  try {
    const {taskId} = req.params
    const tasks = await Task.findByPk(taskId, {
      include: {
        model: User
      }
    })
    res.send(tasks)
  } catch (err) {
    next(err)
  }
})

//update task
// api/tasks/:taskId
router.put('/:taskId', async (req, res, next) => {
  try {
    const userId = req.user.id
    const {taskId} = req.params

    const updated = await Task.update(req.body, {
      returning: true,
      where: {
        id: taskId
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
    const [numUpdated, [updatedTask]] = updated
    res.send(updatedTask)
  } catch (err) {
    next(err)
  }
})

//delete task
// api/tasks/:taskId
router.delete('/:taskId', async (req, res, next) => {
  try {
    const userId = req.user.id
    const {taskId} = req.params
    await Task.destroy({
      where: {
        id: taskId
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

//assign user to task
// api/tasks/assignUser/:taskId
router.put('/assignUser/:taskId', async (req, res, next) => {
  try {
    const {taskId} = req.params
    const task = await Task.findOne({
      where: {
        id: taskId
      },
      include: {
        model: User
      }
    })
    const userToBeAssignedId = req.body.id
    const user = await User.findOne({
      where: {
        id: userToBeAssignedId
      }
    })
    await task.addUser(user)
    res.send(204).end()
  } catch (err) {
    next(err)
  }
})

//create new task
// api/tasks/boards/:boardId
router.post('/boards/:boardId', async (req, res, next) => {
  try {
    const {boardId} = req.params
    const {name, description, dueDate, type, label} = req.body
    console.log(req.body)
    const newTask = await Task.create({
      name,
      description,
      dueDate,
      type,
      label,
      boardId
    })
    res.send(newTask)
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      res.status(401).send(err.errors[0].message)
    } else {
      next(err)
    }
  }
})

//get all tasks for a specific board
router.get('/allTasks/:boardId', async (req, res, next) => {
  try {
    const {boardId} = req.params
    const tasks = await Task.findAll({
      include: [
        {
          model: Board,
          where: {
            id: boardId
          },
          include: User
        },
        {model: User}
      ]
    })
    res.send(tasks)
  } catch (err) {
    next(err)
  }
})

module.exports = router
