'use strict'

const express = require('express')
const router = express.Router()
const licenseData = require('../data')

router.get('/:licenseShortName/', (req, res, next) => {
  const licenseShortName = req.params.licenseShortName

  if (licenseShortName) {
    (async () => {
      let licenseInfo = await licenseData.getLicenseAsync(licenseShortName)

      console.dir(licenseInfo[0])
      console.dir(licenseInfo.length)

      if (licenseInfo.length === 0) {
        res.status(404).json({
          error: 'not found'
        })
      } else {
        res.status(200).json(licenseInfo[0])
      }
    })()
  } else {
    res.status(400)
  }
})

module.exports = router
