'use strict'

const rp = require('request-promise')
const cheerio = require('cheerio')

const url = 'https://choosealicense.com/appendix/'

const options = {
  uri: url,
  transform: body => {
    return cheerio.load(body)
  }
}

async function GetLicenses () {
  let webContent = await invokeWebRequest(options)

  let links = []

  const regex = new RegExp('/licenses/.*')

  webContent('tbody>tr>th>a[href]').each((i, value) => {
    let link = webContent(value).attr('href')

    const match = link.match(regex)

    if (match) {
      let licenseUrl = `https://choosealicense.com${match}`
      links.push(licenseUrl)
    }
  })

  console.log(links)
  return links
}

async function invokeWebRequest (opts) {
  try {
    let webReq = await rp(opts)
    return webReq
  } catch (error) {
    console.error(`error fetching web content:\n${error}`)
  }
}

module.exports = GetLicenses
