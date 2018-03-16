'use strict'

const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  const ipAddress = req.ip ||
    req.headers['x-forwarded-for'][0] ||
    req.connection.remoteAddress

  if (!ipAddress) {
    let err = new Error('No Ip')
    err.status = 400
    next(err)
  } else {
    res.status(200).json({ip: ipAddress})
  }
})

module.exports = router
