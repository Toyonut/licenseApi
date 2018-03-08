'use strict'

const osmosis = require('osmosis')
const pgp = require('pg-promise')()
const PQ = require('pg-promise').ParameterizedQuery

const config = require('../config/dbConfig.json')

const db = pgp(config)

const urls = [
  'https://choosealicense.com/licenses/afl-3.0',
  'https://choosealicense.com/licenses/agpl-3.0',
  'https://choosealicense.com/licenses/apache-2.0',
  'https://choosealicense.com/licenses/artistic-2.0',
  'https://choosealicense.com/licenses/bsd-2-clause',
  'https://choosealicense.com/licenses/bsd-3-clause-clear',
  'https://choosealicense.com/licenses/bsd-3-clause',
  'https://choosealicense.com/licenses/bsl-1.0',
  'https://choosealicense.com/licenses/cc-by-4.0',
  'https://choosealicense.com/licenses/cc-by-sa-4.0',
  'https://choosealicense.com/licenses/cc0-1.0',
  'https://choosealicense.com/licenses/ecl-2.0',
  'https://choosealicense.com/licenses/epl-1.0',
  'https://choosealicense.com/licenses/epl-2.0',
  'https://choosealicense.com/licenses/eupl-1.1',
  'https://choosealicense.com/licenses/eupl-1.2',
  'https://choosealicense.com/licenses/gpl-2.0',
  'https://choosealicense.com/licenses/gpl-3.0',
  'https://choosealicense.com/licenses/isc',
  'https://choosealicense.com/licenses/lgpl-2.1',
  'https://choosealicense.com/licenses/lgpl-3.0',
  'https://choosealicense.com/licenses/lppl-1.3c',
  'https://choosealicense.com/licenses/mit',
  'https://choosealicense.com/licenses/mpl-2.0',
  'https://choosealicense.com/licenses/ms-pl',
  'https://choosealicense.com/licenses/ms-rl',
  'https://choosealicense.com/licenses/ncsa',
  'https://choosealicense.com/licenses/ofl-1.1',
  'https://choosealicense.com/licenses/osl-3.0',
  'https://choosealicense.com/licenses/postgresql',
  'https://choosealicense.com/licenses/unlicense',
  'https://choosealicense.com/licenses/wtfpl',
  'https://choosealicense.com/licenses/zlib'
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
    page.licenseShortName = getShortName(url)
    console.dir(page)

    let dataArray = Object.values(page)

    insertOneRecordAsync(dataArray)
  })
  .log(console.log)
  .error(console.error)
  .debug(console.log)
})

async function insertOneRecordAsync (licenseData) {
  const insertStatement = new PQ('INSERT INTO license_info(license_name, license_text, license_url, license_short_name) VALUES($1, $2, $3, $4) RETURNING id', licenseData)

  try {
    let result = await db.one(insertStatement)
    console.log(`ID of inserted record: ${result.id}`)
  } catch (err) {
    console.error(`ERROR: ${err}`)
  }
}

const getShortName = (licenseUrl) => {
  let url = licenseUrl.toLowerCase()
  let urlSegments = url.split('/')

  let licencesIndex = urlSegments.indexOf('licenses')
  let licenseNameIndex = licencesIndex + 1

  let licenseShortName = urlSegments[licenseNameIndex]
  return licenseShortName
}
