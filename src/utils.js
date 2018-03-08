const licenseData = require('../src/data')

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
  return `${req.protocol}://${req.get('host')}${req.originalUrl}license/${shortName}`
}

async function getLicenses (req) {
  let result = await licenseData.getLicenseInfoAsync()
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

module.exports = {
  checkDbConnection,
  getLicenses
}
