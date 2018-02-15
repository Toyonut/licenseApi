'use strict'

const osmosis = require('osmosis')
const pgp = require('pg-promise')()

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

    insertOneRecord(dataArray)
  })
  .log(console.log)
  .error(console.log)
  .debug(console.log)
})

const insertOneRecord = (licenseData) => {
  const db = pgp('postgres://nodeuser:password@localhost:5432/licensedata')

  db.one('INSERT INTO license_info(license_name, license_text, license_url) VALUES($1, $2, $3) RETURNING id', licenseData)
  .then(data => {
    console.log(data.id) // print new user id;
  })
  .catch(error => {
    console.log('ERROR:', error) // print error;
  })
}
