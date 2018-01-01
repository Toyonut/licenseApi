const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()

/* GET home page. */
const urlEncodedParser = bodyParser.urlencoded({ extended: true })

router.get('/', urlEncodedParser, (req, res, next) => {
  if (!req.body) return res.status(400)

  const userName = req.query.username
  console.dir(userName)

  res.status(200).json({welcome: userName})
})

module.exports = router
