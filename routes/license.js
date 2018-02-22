'use strict'

const express = require('express')
const router = express.Router()

/* GET home page. */

router.get('/:licenseName/', (req, res, next) => {
  const licenseName = req.params.licenseName
  if (licenseName) {
    res.status(200).json({
      licenseName: licenseName
    })
  } else {
    res.status(400)
  }
})

module.exports = router
