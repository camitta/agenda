const router = require('express').Router()
router.use('/users', require('./users'))
router.use('/tasks', require('./tasks'))
router.use('/boards', require('./boards'))
router.use('/checklist', require('./checklist-items'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
