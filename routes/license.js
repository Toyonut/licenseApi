'use strict'

const express = require('express')
const router = express.Router()
const pgp = require('pg-promise')()
const PQ = require('pg-promise').ParameterizedQuery

const config = {
  host: 'localhost',
  port: 5432,
  database: 'licensedata',
  user: 'nodeuser',
  password: 'password'
}

const db = pgp(config)

router.get('/:licenseName/', (req, res, next) => {
  const licenseName = req.params.licenseName

  if (licenseName) {
    (async () => {
      let licenseRows = await getLicenseTable()

      let allLicenseNames = []

      for (let i = 0; i < licenseRows.length; i++) {
        let shortName = licenseRows[i].license_short_name
        allLicenseNames.push(shortName.toLowerCase())
      }

      console.log(allLicenseNames)

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

module.exports = router

async function getLicenseTable () {
  const statement = new PQ({
    text: 'select * from license_info'
  })
  try {
    let result = await db.query(statement)
    return result
  } catch (err) {
    console.error(`ERROR: ${err}`)
  }
}
