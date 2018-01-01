const express = require('express')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')

const index = require('./routes/index')

const app = express()

app.use(helmet())
app.use(logger('dev'))
app.use(cookieParser())

app.use('/', index)

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
