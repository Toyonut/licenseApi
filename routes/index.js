'use strict'

const express = require('express')
const router = express.Router()
const licenseData = require('../data')

router.get('/', (req, res, next) => {
  (async () => {
    let licenses = await getLicenses(req)

    res.status(200).json(licenses)
  })()
})

module.exports = router

function buildUrl (req, shortName) {
  return `${req.protocol}://${req.get('host')}${req.originalUrl}license/${shortName}`
}

async function getLicenses (req) {
  let result = await licenseData.getLicenseInfoAsync()
  let licenses = []

  for (let i = 0; i < result.length; i++) {
    let details = {
      name: '',
      url: ''
    }

    details.name = result[i].license_name
    details.url = buildUrl(req, result[i].license_short_name)

    licenses.push(details)
  }
  return licenses
}
