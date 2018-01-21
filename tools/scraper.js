'use strict'

const osmosis = require('osmosis')

const urls = [
  'https://choosealicense.com/licenses/mit/'
]

urls.forEach(url => {
  osmosis
  .get(url)
  .set({
    'licenseText': '#license-text'
  })
  .data(function (page) {
    console.log(page)
  })
  .log(console.log)
  .error(console.log)
  .debug(console.log)
})
