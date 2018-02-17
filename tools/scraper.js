'use strict'

const osmosis = require('osmosis')
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

const urls = [
  'https://choosealicense.com/licenses/mit/',
  'https://choosealicense.com/licenses/agpl-3.0/',
  'https://choosealicense.com/licenses/gpl-3.0/',
  'https://choosealicense.com/licenses/lgpl-3.0/',
  'https://choosealicense.com/licenses/mpl-2.0/',
  'https://choosealicense.com/licenses/apache-2.0/',
  'https://choosealicense.com/licenses/unlicense/'
]

urls.forEach(url => {
  osmosis
  .get(url)
  .set({
    'licenseName': 'h1',
    'licenseText': '#license-text'
  })
  .data((page) => {
    page.url = url
    console.dir(page)

    console.log(`License name is ${page.licenseName}.
    License text is ${page.licenseText}.
    License url is ${page.url}.
    Inserting into Database.`)

    let dataArray = [page.licenseName, page.licenseText, page.url]

    insertOneRecordAsync(dataArray)
  })
  .log(console.log)
  .error(console.error)
  .debug(console.log)
})

async function insertOneRecordAsync (licenseData) {
  const insertStatement = new PQ('INSERT INTO license_info(license_name, license_text, license_url) VALUES($1, $2, $3) RETURNING id', licenseData)

  try {
    let result = await db.one(insertStatement)
    console.log(`ID of inserted record: ${result.id}`)
  } catch (err) {
    console.error(`ERROR: ${err}`)
  }
}
