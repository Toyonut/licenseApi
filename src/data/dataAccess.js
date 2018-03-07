'use strict'
const PQ = require('pg-promise').ParameterizedQuery

class Licenses {
  constructor (db) {
    this.db = db
  }

  getConnectionAsync () {
    return this.db.connect()
  }

  getLicenseInfoAsync () {
    const statement = new PQ({
      text: 'select license_name, license_short_name from license_info'
    })
    try {
      return this.db.query(statement)
    } catch (err) {
      console.error(`ERROR: ${err}`)
    }
  }

  getLicenseAsync (licenseShortName) {
    const statement = new PQ({
      text: 'select * from license_info where license_short_name = $1',
      values: [licenseShortName]
    })
    try {
      return this.db.query(statement)
    } catch (err) {
      console.error(`ERROR: ${err}`)
    }
  }
}

module.exports = Licenses
