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
    let inputFilePath = path.join('data', 'full_license_info.json')

    let fileContents = await readFileAsync(inputFilePath)

    let jsonDataArray = JSON.parse(fileContents)

    jsonDataArray.forEach(async jsonData => {
      let fields = {
        'id': jsonData.id,
        'name': jsonData.name,
        'licenseText': jsonData.licensetext,
        'url': jsonData.url,
        'description': jsonData.description,
        'permissions': jsonData.permissions,
        'conditions': jsonData.conditions,
        'limitations': jsonData.limitations
      }

      // console.dir(fields)
      insertOneRecordAsync(fields)
    })
  } catch (error) {
    console.error(`error fetching web content:\n${error}`)
  }
}

async function insertOneRecordAsync (licenseData) {
  // console.log(licenseData.id)
  const insertStatement = new PQ(`
    INSERT INTO LicenseInfo(id, name, licensetext, url, description, permissions, conditions, limitations)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`)

  insertStatement.values = [
    licenseData.id,
     licenseData.name,
     licenseData.licenseText,
     licenseData.url,
     licenseData.description,
     licenseData.permissions,
     licenseData.conditions,
     licenseData.limitations
  ]

  try {
    let result = await db.one(insertStatement)
    console.log(`ID of inserted record: ${result.id}`)
  } catch (error) {
    console.error(`error inserting into DB:\n${error}`)
  }
}
