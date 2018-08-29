'use strict'
require('dotenv').config()

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

const db = pgp(process.env.DATABASE_URL)

const LicenseDAL = new LicenseMethods(db)

module.exports = LicenseDAL
