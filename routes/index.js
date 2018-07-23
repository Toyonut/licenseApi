'use strict'

const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const urlEncodedParser = bodyParser.urlencoded({ extended: true })
const licenseData = require('../src/data')
const {placeholderReplace, getMinMaxShortName} = require('../src/licenseUtils')
const joi = require('joi')

router.get('/', (req, res, next) => {
  res.status(200).render('index.ejs', {
    license_name: '',
    license_text: ''
  })
})

router.get('/howto', (req, res, next) => {
  res.status(200).render('howto.ejs')
})

router.post('/', urlEncodedParser, (req, res, next) => {
  (async () => {
    // build requestParams object
    let requestParams = {}

    if (req.body.license) {
      requestParams.licenseShortName = req.body.license
    }

    // Need to ignore these if they are defaults to avoid tripping up Joi.
    // if (req.body.name) {
    //   requestParams.name = req.body.name
    // }

    // if (req.body.email) {
    //   requestParams.email = req.body.email
    // }

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
        res.status(200).render('index.ejs', placeholderReplace(requestParams))
      }
    } else {
      let err = result.error
      err.status = 400
      next(err)
    }
  })()
})

module.exports = router
