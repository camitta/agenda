const router = require('express').Router()
const {Task, Board} = require('../db/models/task')

//called by List component
//api/tasks/:type
router.get('/:type', async (req, res, next) => {
  try {
    if (req.board) {
      const tasks = await Task.findAll({
        where: {
          type: req.params.type,
          boardId: req.board.id
        }
      })
      res.json(tasks)
    } else if (!req.board) {
      res.status(100)
    }
  } catch (err) {
    next(err)
  }
})

//create new task
// api/tasks/
router.post('/', async (req, res, next) => {
  try {
    const currentBoard = await Board.findOne({
      where: {
        id: req.board.id
      }
    })
    const newTask = await Task.create({
      name: req.body.name,
      description: req.body.description,
      dueDate: req.body.dueDate,
      label: req.body.label
    })
    await newTask.setBoard(currentBoard)
    res.json(newTask)
  } catch (err) {
    next(err)
  }
})

//update task
// api/tasks/edit/:taskId
router.put('/edit/:taskId', async (req, res, next) => {
  try {
    const currentTask = await Task.findByPk(req.params.taskId)
    await currentTask.update(req.body)
    res.send(204).end()
  } catch (err) {
    next(err)
  }
})

//delete task
// api/tasks/delete/:taskId
router.delete('/delete/:taskId', async (req, res, next) => {
  try {
    await Task.destroy({
      where: {
        id: req.params.itemId
      }
    })
    res.send(204).end()
  } catch (err) {
    next(err)
  }
})

module.exports = router
