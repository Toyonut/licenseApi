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
  let result = await getLicensesDbCall()
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

async function getLicensesDbCall () {
  const statement = new PQ({
    text: 'select license_name, license_short_name from license_info'
  })
  try {
    let result = await db.query(statement)
    return result
  } catch (err) {
    console.error(`ERROR: ${err}`)
  }
}
