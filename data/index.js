'use strict'
const LicenseMethods = require('./dataAccess')
const pgp = require('pg-promise')()

const config = {
  host: 'localhost',
  port: 5432,
  database: 'licensedata',
  user: 'nodeuser',
  password: 'password'
}

const db = pgp(config)

const Licenses = new LicenseMethods(db)

module.exports = Licenses
