'use strict'

const express = require('express')
const router = express.Router()
const licenseData = require('../src/data')
const {placeholderReplace} = require('../src/licenseUtils')

router.get('/:licenseShortName/', (req, res, next) => {
  const licenseShortName = req.params.licenseShortName;

  (async () => {
    let licenseInfo = await licenseData.getLicenseAsync(licenseShortName)

    if (licenseInfo.length === 0) {
      const err = new Error('Not Found')
      err.status = 404
      next(err)
    } else {
      let replaceParams = {}

      replaceParams.licenseInfo = licenseInfo[0]

      if (req.query.name) {
        replaceParams.userName = req.query.name
      }

      if (req.query.email) {
        replaceParams.email = req.query.email
      }

      res.status(200).json(placeholderReplace(replaceParams))
    }
  })()
})

module.exports = router
