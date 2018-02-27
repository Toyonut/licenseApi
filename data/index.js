'use strict'
const LicenseMethods = require('./dataAccess')
const pgp = require('pg-promise')()
const config = require('../config/dbConfig.json')

const db = pgp(config)

const Licenses = new LicenseMethods(db)

module.exports = Licenses
