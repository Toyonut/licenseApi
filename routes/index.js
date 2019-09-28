'use strict'

const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const urlEncodedParser = bodyParser.urlencoded({ extended: true })
const {placeholderReplace, getMinMaxShortName, getLicense} = require('../src/licenseUtils')
const joi = require('@hapi/joi')

router.get('/', (req, res, next) => {
  res.status(200).render('index.ejs', {
    name: '',
    licenseText: ''
  })
})

router.get('/howto', (req, res, next) => {
  res.status(200).render('howto.ejs', {
    host_name: req.headers.host
  })
})

router.post('/', urlEncodedParser, async (req, res, next) => {
  // build requestParams object
  let requestParams = {}

  if (req.body.license) {
    requestParams.id = req.body.license
  }

  if (req.body.name) {
    requestParams.name = req.body.name
  }

  if (req.body.email) {
    requestParams.email = req.body.email
  }

  if (req.body.project_url) {
    requestParams.projectUrl = req.body.projectUrl
  }

  if (req.body.project_name) {
    requestParams.projectName = req.body.projectName
  }

  let nameLength = await getMinMaxShortName()

  const schema = joi.object().keys({
    id: joi.string().min(nameLength.min).max(nameLength.max).required(),
    name: joi.string().min(1).max(50),
    email: joi.string().email(),
    projectName: joi.string().min(1).max(50),
    projectUrl: joi.string().min(1).max(50)
  })

  // validate the user parameters
  const result = joi.validate(requestParams, schema)

  if (result.error === null) {
    let licenseInfo = await getLicense(requestParams.id)

    // check if we return an empty object which indicates there was nothing returned from the SQL query
    if (Object.keys(licenseInfo).length === 0 && licenseInfo.constructor === Object) {
      const err = new Error('Not Found')
      err.status = 404
      next(err)
    } else {
      requestParams.licenseInfo = licenseInfo

      res.status(200).render('index.ejs', placeholderReplace(requestParams))
    }
  } else {
    let err = result.error
    err.status = 400
    next(err)
  }
})

module.exports = router
