
// // need to install npm install cookie-parser
// var express = require('express')
// var app = express()
// var cookieParser = require('cookie-parser')

// // load the cookie-parsing middleware
// app.use(cookieParser())


var express = require('express')
var cookieParser = require('cookie-parser')

var app = express()
app.use(cookieParser())

app.get('/', function (req, res) {
  // Cookies that have not been signed
  console.log('Cookies: ', req.cookies)

  // Cookies that have been signed
  console.log('Signed Cookies: ', req.signedCookies)
})

app.listen(8080)


// var express = require('express')
// var cookieParser = require('cookie-parser')
// var cookieValidator = require('./cookieValidator')

// var app = express()

// async function validateCookies (req, res, next) {
//   await cookieValidator(req.cookies)
//   next()
// }

// app.use(cookieParser())

// app.use(validateCookies)

// // error handler
// app.use(function (err, req, res, next) {
//   res.status(400).send(err.message)
// })

// app.listen(3000)
