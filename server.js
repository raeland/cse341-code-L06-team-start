const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongodb = require('./db/connect')
const port = process.env.PORT || 8080
const app = express()

app
  .use(bodyParser.json())
  .use(cors())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
  })
  .use('/', require('./routes'))

// a type of catch all error handeling
process.on('uncaughtException', (err,origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`)
})



// const createError = require('http-errors')
// const path = require('path')
// const { signupValidation, loginValidation } = require('./validation.js');

// app.use(express.json());

// app.use(bodyParser.urlencoded({
//     extended: true
// }));
// app.get('/', (req, res) => {
//     res.send('Node js file upload rest apis');
// });
// app.post('/register', signupValidation, (req, res, next) => {
//    // your registration code
// });
// app.post('/login', loginValidation, (req, res, next) => {
//    // your login code
// });
// // Handling Errors
// app.use((err, req, res, next) => {
//     // console.log(err);
//     err.statusCode = err.statusCode || 500;
//     err.message = err.message || "Internal Server Error";
//     res.status(err.statusCode).json({
//       message: err.message,
//     });
// });




mongodb.initDb((err) => {
  if (err) {
    console.log(err)
  } else {
    app.listen(port)
    console.log(`Connected to DB and listening on ${port}`)
  }
})