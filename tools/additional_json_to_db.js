'use strict'

const pgp = require('pg-promise')()
const PQ = require('pg-promise').ParameterizedQuery
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const util = require('util')
const readFileAsync = util.promisify(fs.readFile)

const db = pgp(process.env.DATABASE_URL)

writeRecordsAsync()

async function writeRecordsAsync () {
  try {
    let inputFilePath = path.join('data', 'additional_license_info.json')

    let fileContents = await readFileAsync(inputFilePath)

    let jsonDataArray = JSON.parse(fileContents)

    jsonDataArray.licenses.forEach(async jsonData => {
      let fields = {
        'description': jsonData.description,
        'permissions': jsonData.permissions,
        'conditions': jsonData.conditions,
        'limitations': jsonData.limitations,
        'id': jsonData.id
      }

      console.dir(fields)
      insertOneRecordAsync(fields)
    })
  } catch (error) {
    console.error(`error fetching web content:\n${error}`)
  }
}

async function insertOneRecordAsync (licenseData) {
  const insertStatement = new PQ(`UPDATE license_info
  SET description = $1,
    permissions = $2,
    conditions = $3,
    limitations = $4
  WHERE license_short_name = $5
  RETURNING id`,
    [licenseData.description, licenseData.permissions, licenseData.conditions, licenseData.limitations, licenseData.id])

  try {
    let result = await db.one(insertStatement)
    console.log(`ID of inserted record: ${result.id}`)
  } catch (error) {
    console.error(`error inserting into DB:\n${error}`)
  }
}
