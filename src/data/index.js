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
const config = {
  'host': process.env.DB_HOST,
  'port': process.env.DB_PORT,
  'database': process.env.DATABASE,
  'user': process.env.DB_USER,
  'password': process.env.DB_PASSWORD
}

const db = pgp(config)

const LicenseDAL = new LicenseMethods(db)

module.exports = LicenseDAL
