'use strict'

const pgp = require('pg-promise')()
const PQ = require('pg-promise').ParameterizedQuery
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const util = require('util')
const readFileAsync = util.promisify(fs.readFile)

const config = {
  'host': process.env.DB_HOST,
  'port': process.env.DB_PORT,
  'database': process.env.DATABASE,
  'user': process.env.DB_USER,
  'password': process.env.DB_PASSWORD
}

const db = pgp(config)

writeRecordsAsync()

async function writeRecordsAsync () {
  try {
    let inputFilePath = path.join('data', 'license_info.json')

    let fileContents = await readFileAsync(inputFilePath)

    let jsonDataArray = JSON.parse(fileContents)

    jsonDataArray.forEach(async jsonData => {
      let fields = {
        'licenseName': jsonData.license_name,
        'licenseText': jsonData.license_text,
        'url': jsonData.license_url,
        'licenseShortName': jsonData.license_short_name
      }

      console.dir(fields)
      insertOneRecordAsync(fields)
    })
  } catch (error) {
    console.error(`error fetching web content:\n${error}`)
  }
}

async function insertOneRecordAsync (licenseData) {
  const insertStatement = new PQ('INSERT INTO license_info(license_name, license_text, license_url, license_short_name) VALUES($1, $2, $3, $4) RETURNING id',
    [licenseData.licenseName, licenseData.licenseText, licenseData.url, licenseData.licenseShortName])

  try {
    let result = await db.one(insertStatement)
    console.log(`ID of inserted record: ${result.id}`)
  } catch (error) {
    console.error(`error inserting into DB:\n${error}`)
  }
}
