const express = require('express')
const router = express.Router()

router
    .use('/', require('./swagger'))
    .use('/contacts', require('./contacts'))
    //.use('/vendor', require('./vendor'))
    //.use('/supplies', require('./supplies'))

module.exports = router
