'use strict'
const PQ = require('pg-promise').ParameterizedQuery

class Licenses {
  constructor (db) {
    this.db = db
  }

  getConnectionAsync () {
    return this.db.connect()
  }

  getLicensesAsync () {
    const statement = new PQ({
      text: 'select name, id from licenseinfo'
    })
    try {
      return this.db.query(statement)
    } catch (err) {
      console.error(`ERROR: ${err}`)
    }
  }

  getMinMaxShortNameAsync () {
    const statement = new PQ({
      text: 'select max(length(id)), min(length(id)) from licenseinfo'
    })
    try {
      return this.db.query(statement)
    } catch (err) {
      console.error(`ERROR: ${err}`)
    }
  }

  getLicenseAsync (id) {
    const statement = new PQ({
      text: 'select * from licenseinfo where id = $1',
      values: [id]
    })
    try {
      return this.db.query(statement)
    } catch (err) {
      console.error(`ERROR: ${err}`)
    }
  }
}

module.exports = Licenses
