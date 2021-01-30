const router = require('express').Router()
const {Task} = require('./db/models/task')
module.exports = router

//called by list component
//api/tasks/
router.get('/tasks/:type', async (req, res, next) => {
  try {
    const tasks = await Task.findAll({
      where: {
        type: req.params.type
      }
    })
    res.json(tasks)
  } catch (err) {
    next(err)
  }
})
