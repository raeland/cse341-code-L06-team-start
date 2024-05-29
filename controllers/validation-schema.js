const Joi = require('@hapi/joi')

const authSchema = Joi.object({
    email: Joi.string()
            .email()
            .lowercase()
            .required(),
    password: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
})

module.exports = {
    authSchema
}