'use strict'

const osmosis = require('osmosis')

const url = 'https://choosealicense.com/licenses/'

osmosis
.get(url)
.set({
  'licenseRef': ['.license-overview-name>a @href']
})
.data((data) => {
  data.licenseRef.forEach((ref) => {
    console.log((`https://choosealicense.com${ref}`))
  })
})
.log(console.log)
.error(console.error)
.debug(console.log)
