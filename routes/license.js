'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()

/* GET home page. */
const urlEncodedParser = bodyParser.urlencoded({ extended: true })

router.get('/:licenseName/', urlEncodedParser, (req, res, next) => {
  if (!req.body) return res.status(400)

  const userName = req.query.username
  console.dir(userName)

  const licenseName = req.params.licenseName

  res.status(200).json({
    welcome: userName,
    licenseName: licenseName
  })
})

module.exports = router
