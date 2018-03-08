'use strict'

const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const { checkDbConnection } = require('./src/utils')

const index = require('./routes/index')
const license = require('./routes/license')

const app = express()

app.use(helmet())
app.use(logger('dev'))

checkDbConnection()

app.use('/', index)
app.use('/license', license)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.json({error: res.locals.message})
})

module.exports = app
