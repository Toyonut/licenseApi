'use strict'

const express = require('express')
const router = express.Router()
const licenseData = require('../data')

router.get('/:licenseName/', (req, res, next) => {
  const licenseName = req.params.licenseName

  if (licenseName) {
    (async () => {
      let allLicenseNames = await getAllLicenses()

      if (allLicenseNames.includes(licenseName.toLowerCase())) {
        res.status(200).json({
          name: licenseName
        })
      } else {
        res.status(404).json({
          error: 'not found'
        })
      }
    })()
  } else {
    res.status(400)
  }
})

async function getAllLicenses () {
  let licenseRows = await licenseData.getLicenseTable()

  let allLicenseNames = []

  for (let i = 0; i < licenseRows.length; i++) {
    let shortName = licenseRows[i].license_short_name
    allLicenseNames.push(shortName.toLowerCase())
  }

  console.log(allLicenseNames)
  return allLicenseNames
}

module.exports = router
