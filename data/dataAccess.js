'use strict'

const pgp = require('pg-promise')()
const PQ = require('pg-promise').ParameterizedQuery

const config = {
  host: 'localhost',
  port: 5432,
  database: 'licensedata',
  user: 'nodeuser',
  password: 'password'
}

class Licenses {
  constructor (db) {
    this.db = pgp(config)
  }

  getLicenses () {
    const statement = new PQ({
      text: 'select license_name, license_short_name from license_info'
    })
    try {
      return this.db.query(statement)
    } catch (err) {
      console.error(`ERROR: ${err}`)
    }
  }

  getLicenseTable () {
    const statement = new PQ({
      text: 'select * from license_info'
    })
    try {
      return this.db.query(statement)
    } catch (err) {
      console.error(`ERROR: ${err}`)
    }
  }
}

module.exports = Licenses
