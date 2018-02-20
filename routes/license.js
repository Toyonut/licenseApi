'use strict'

const express = require('express')
const router = express.Router()

/* GET home page. */

router.get('/:licenseName/', (req, res, next) => {
  if (!req.body) return res.status(400)

  const licenseName = req.params.licenseName

  res.status(200).json({
    licenseName: licenseName
  })
})

module.exports = router
