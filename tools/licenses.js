'use strict'

const osmosis = require('osmosis')

const url = 'https://choosealicense.com/appendix/'

osmosis
.get(url)
.set({
  'licenseRef': ['a @href']
})
.data((data) => {
  const urlArray = []

  data.licenseRef.map(val => {
    const regex = new RegExp('/licenses/.*')
    const match = val.match(regex)

    if (match) {
      let licenseUrl = `https://choosealicense.com${match}`
      console.log(licenseUrl)
      urlArray.push(licenseUrl)
    }
  })
  console.log(urlArray)
})
.log(console.log)
.error(console.error)
.debug(console.log)
