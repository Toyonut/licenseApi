'use strict'

const express = require('express')
const router = express.Router()
const { getLicenses } = require('../src/utils')

router.get('/', (req, res, next) => {
  (async () => {
    let licenses = await getLicenses(req)

    res.status(200).json(licenses)
  })()
})

module.exports = router
