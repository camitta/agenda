const router = require('express').Router()
const {Task, Board, User} = require('../db/models')
const {isLoggedInUser} = require('./routerMiddleware')

//get new single task
//api/tasks/:taskId
router.get('/:taskId', async (req, res, next) => {
  try {
    const {taskId} = req.params
    const tasks = await Task.findByPk(taskId)
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
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

//assign user to task
// api/tasks/assignUser/boards/:boardId
// isLoggedInUser func must be included to avoid error.
router.put(
  '/:taskId/assignUser/boards/:boardId',
  isLoggedInUser,
  async (req, res, next) => {
    try {
      const {taskId, boardId} = req.params
      const task = await Task.findOne({
        where: {
          id: taskId,
          boardId
        }
      })
      const userToBeAssignedId = req.body.id
      const user = await User.findOne({
        where: {
          id: userToBeAssignedId
        }
      })
      await task.addUser(user)
      res.sendStatus(204)
    } catch (err) {
      next(err)
    }
  }
)

//assign user to task
// api/tasks/assignUser/boards/:boardId
// isLoggedInUser func must be included to avoid error.
router.put(
  '/:taskId/unassignUser/boards/:boardId',
  isLoggedInUser,
  async (req, res, next) => {
    try {
      const userId = req.body.id
      const {taskId} = req.params
      const task = await Task.findByPk(taskId)
      await task.removeUser(userId)
      res.sendStatus(204)
    } catch (err) {
      next(err)
    }
  }
)

//create new task
// api/tasks/boards/:boardId
router.post('/boards/:boardId', isLoggedInUser, async (req, res, next) => {
  try {
    const {boardId} = req.params
    const {name, description, dueDate, type, label, index} = req.body
    const newTask = await Task.create({
      name,
      description,
      dueDate,
      type,
      label,
      boardId,
      index
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
router.get('/allTasks/:boardId', isLoggedInUser, async (req, res, next) => {
  try {
    const {boardId} = req.params
    const tasks = await Task.findAll({
      include: [
        {
          model: Board,
          where: {
            id: boardId
          },
          include: {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
          }
        },
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        }
      ]
    })
    res.send(tasks)
  } catch (err) {
    next(err)
  }
})

//remove an assigned chip from taskId
router.put('/:taskId/chips/remove', async (req, res, next) => {
  try {
    const {taskId} = req.params
    const userId = req.user.id
    await Task.update(req.body, {
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
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

//remove a user from all tasks associated with the board id
router.put('/boards/:boardId/delete/user', async (req, res, next) => {
  try {
    const {boardId} = req.params
    const userId = req.body.id
    const tasks = await Task.findAll({
      where: {
        boardId: boardId
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
    const user = await User.findByPk(userId)
    await user.removeTasks(tasks)
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

module.exports = router
