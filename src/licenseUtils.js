'use strict'

const licenseData = require('./data')

async function checkDbConnection () {
  try {
    const obj = await licenseData.getConnectionAsync()
    if (obj) {
      console.log(`DB connected.`)
      obj.done()
    }
  } catch (error) {
    console.error(`Error Messsage: ${error}`)
  }
}

function buildUrl (req, shortName) {
  return `${req.protocol}://${req.get('host')}${req.originalUrl}/${shortName}`
}

async function getLicenses (req) {
  let result = await licenseData.getLicensesAsync()
  let licenses = []

  for (let i = 0; i < result.length; i++) {
    let details = {
      name: '',
      shortName: '',
      url: ''
    }

    details.name = result[i].license_name
    details.shortName = result[i].license_short_name
    details.url = buildUrl(req, result[i].license_short_name)

    licenses.push(details)
  }
  return licenses
}

async function getMinMaxShortName () {
  try {
    let length = await licenseData.getMinMaxShortNameAsync()

    let nameLengths = {
      'min': length[0].min,
      'max': length[0].max
    }

    return nameLengths
  } catch (err) {
    console.error(`${err}`)
  }
}

function placeholderReplace ({name, email, licenseInfo, projectUrl, projectName}) {
  const thisYear = new Date().getFullYear()
  const dateRegex = new RegExp('\\[year\\]|\\[yyyy\\]', 'ig')
  const userRegex = new RegExp('\\[fullname\\]|\\[name of copyright owner\\]', 'ig')
  const emailRegex = new RegExp('\\[email\\]', 'ig')
  const projectNameRegex = new RegExp('\\[project\\]', 'ig')
  const projectUrlRegex = new RegExp('\\[projecturl\\]', 'ig')

  let licenseText = licenseInfo.license_text
  const dateMatch = licenseText.match(dateRegex)
  const userMatch = licenseText.match(userRegex)
  const emailMatch = licenseText.match(emailRegex)
  const projectNameMatch = licenseText.match(projectNameRegex)
  const projectUrlMatch = licenseText.match(projectUrlRegex)

  if (dateMatch) {
    licenseText = licenseText.replace(dateRegex, thisYear)
  }

  // replace if there is a match and value supplied
  if (userMatch && name) {
    licenseText = licenseText.replace(userRegex, name)
  }

  if (emailMatch && email) {
    licenseText = licenseText.replace(emailRegex, email)
  }

  if (projectUrlMatch && projectUrl) {
    licenseText = licenseText.replace(projectUrlRegex, projectUrl)
  }

  if (projectNameMatch && projectName) {
    licenseText = licenseText.replace(projectNameRegex, projectName)
  }

  licenseInfo.license_text = licenseText
  return licenseInfo
}

module.exports = {
  checkDbConnection,
  getLicenses,
  placeholderReplace,
  getMinMaxShortName
}
