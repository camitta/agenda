const express = require('express')

//checks if current in user logged in and is same user making request
const isLoggedInUser = (req, res, next) => {
  if (req.user && req.user.id === Number(req.params.userId)) {
    next()
  } else {
    const err = new Error('Access Denied.')
    err.status = 401
    next(err)
  }
}

//checks if current user is admin
const isAdmin = (req, res, next) => {
  const currentUser = req.user
  if (currentUser && currentUser.isAdmin) {
    next()
  } else {
    const err = new Error('Credentials Denied.')
    err.status = 403
    next(err)
  }
}

module.exports = {isLoggedInUser, isAdmin}
