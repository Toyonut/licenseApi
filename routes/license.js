'use strict'

const express = require('express')
const router = express.Router()
const licenseData = require('../src/data')
const {placeholderReplace, getMinMaxShortName, getLicenses} = require('../src/licenseUtils')
const joi = require('joi')

router.get('/', (req, res, next) => {
  (async () => {
    let licenses = await getLicenses(req)

    res.status(200).json(licenses)
  })()
})

router.get('/:licenseShortName/', (req, res, next) => {
  (async () => {
    // build requestParams object
    let requestParams = {}

    if (req.query.name) {
      requestParams.name = req.query.name
    }

    if (req.query.email) {
      requestParams.email = req.query.email
    }

    if (req.params.licenseShortName) {
      requestParams.licenseShortName = req.params.licenseShortName
    }

    let nameLength = await getMinMaxShortName()

    const schema = joi.object().keys({
      licenseShortName: joi.string().min(nameLength.min).max(nameLength.max).required(),
      name: joi.string().min(1).max(30),
      email: joi.string().email()
    })

    // validate the user parameters
    const result = joi.validate(requestParams, schema)

    if (result.error === null) {
      let licenseInfo = await licenseData.getLicenseAsync(requestParams.licenseShortName)

      if (licenseInfo.length === 0) {
        const err = new Error('Not Found')
        err.status = 404
        next(err)
      } else {
        requestParams.licenseInfo = licenseInfo[0]
        res.status(200).json(placeholderReplace(requestParams))
      }
    } else {
      let err = result.error
      err.status = 400
      next(err)
    }
  })()
})

module.exports = router