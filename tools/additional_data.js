'use strict'

const fs = require('fs')
const path = require('path')
const https = require('https')

https.get('https://licenseapi.herokuapp.com/', (req) => {
  let data = []

  req.on('data', (dataChunk) => {
    data.push(dataChunk)
  })

  req.on('end', () => {
    console.dir(data.join(''))
    writeToFile(data)
  })

  req.on('error', (err) => {
    console.error(err)
  })
})

async function writeToFile (data) {
  let outputFilePath = path.join('data', 'additional_license_info.json')
  try {
    console.log(`Writing data to ${outputFilePath}.`)
    fs.writeFileSync(outputFilePath, data)
  } catch (error) {
    console.error(`writing file ${outputFilePath}:\n${error}`)
  }
}
