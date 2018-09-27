'use strict'

const express = require('express')
const router = express.Router()
const {placeholderReplace, getMinMaxShortName, getLicenses, getLicense} = require('../src/licenseUtils')
const joi = require('joi')

router.get('/', async (req, res, next) => {
  let licenses = await getLicenses(req)

  res.status(200).json(licenses)
})

router.get('/:id/', async (req, res, next) => {
  // build requestParams object
  let requestParams = {}

  if (req.query.name) {
    requestParams.name = req.query.name
  }

  if (req.query.email) {
    requestParams.email = req.query.email
  }

  if (req.params.id) {
    requestParams.id = req.params.id
  }

  if (req.params.project_url) {
    requestParams.projectUrl = req.params.projectUrl
  }

  if (req.params.project_name) {
    requestParams.projectName = req.params.projectName
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

      res.status(200).json(placeholderReplace(requestParams))
    }
  } else {
    let err = result.error
    err.status = 400
    next(err)
  }
})

module.exports = router
