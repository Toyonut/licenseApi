const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  res.json({'response': 'Yes'}).status(200)
})

module.exports = router
