'use strict'

const initOptions = {
  // global event notification;
  error: (error, e) => {
    if (e.cn) {
      // A connection-related error;
      //
      // Connections are reported back with the password hashed,
      // for safe errors logging, without exposing passwords.
      console.error('CN:', e.cn)
      console.error('EVENT:', error.message || error)
    }
  }
}

const LicenseMethods = require('./dataAccess')
const pgp = require('pg-promise')(initOptions)
const config = require('../../config/dbConfig.json')

const db = pgp(config)

const Licenses = new LicenseMethods(db)

module.exports = Licenses
