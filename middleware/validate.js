const validator = require('../helpers/validate')

const saveContact = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    email: 'required|email',
    favoriteColor: 'required|string',
    birthday: 'string'
  }
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      })
    } else {
      next()
    }
  })
}

const saveVendor = (req, res, next) => {
  const validationRule = {
      supplier: 'required|string',
      address: 'required|string',
      phone: 'required|string',
      url: ''
  }
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      })
    } else {
      next()
    }
  })
}
module.exports = {
  saveContact,
  saveVendor
}

// const { body, validationResult } = require('express-validator')
// const { userValidationRules, validate } = require('./validate.js')

// const validate = (req, res, next) => {
//   const errors = validationResult(req)
//   if (errors.isEmpty()) {
//     return next()
//   }
//   const extractedErrors = []
//   errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

//   return res.status(422).json({
//     errors: extractedErrors,
//   })
// }

// app.post('/user', userValidationRules(), validate, (req, res) => {
//   user.create({
//     username: req.body.username,
//     password: req.body.password,
//   }).then(user => res.json(user))
// })


// const { check } = require('express-validator');
// exports.signupValidation = [
//     check('name', 'Name is requied').not().isEmpty(),
//     check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
//     check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
// ]
// exports.loginValidation = [
//      check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
//      check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
// ]

// module.exports = {
//   userValidationRules,
//   validate,
// }