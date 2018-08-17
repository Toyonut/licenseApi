'use strict'

const pgp = require('pg-promise')()
const PQ = require('pg-promise').ParameterizedQuery
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const util = require('util')
const writeFileAsync = util.promisify(fs.writeFile)

const config = {
  'host': process.env.DB_HOST,
  'port': process.env.DB_PORT,
  'database': process.env.DATABASE,
  'user': process.env.DB_USER,
  'password': process.env.DB_PASSWORD
}

const db = pgp(config)

getRecordsAsync()

async function getRecordsAsync () {
  const getStatement = new PQ('select * from license_info')

  try {
    let result = await db.result(getStatement)
    let outputFilePath = path.join('data', 'license_info.json')

    try {
      console.log(`Writing data to ${outputFilePath}`)

      await writeFileAsync(outputFilePath, JSON.stringify(result.rows), 'utf8')
    } catch (fileError) {
      console.error(fileError)
    }
  } catch (dbError) {
    console.error(`Error fetching from DB:\n${dbError}`)
  }
}
