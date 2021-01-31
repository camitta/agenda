const router = require('express').Router()
const {Task, Board, User} = require('../db/models')

//get new single task
//api/tasks/:taskId
router.get('/:taskId', async (req, res, next) => {
  try {
    const {taskId} = req.params
    const {boardId} = req.body
    const task = await Task.findOne({
      where: {
        id: taskId,
        boardId
      }
    })
    res.json(task)
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
    next(err)
  }
})

//update task
// api/tasks/edit/:taskId
router.put('/edit/:taskId', async (req, res, next) => {
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
// api/tasks/delete/:taskId
router.delete('/delete/:taskId', async (req, res, next) => {
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

module.exports = router
