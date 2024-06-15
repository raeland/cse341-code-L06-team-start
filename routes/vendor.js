const router = require('express').Router()
const vendorController = require('../controllers/vendor')
const validation = require('../middleware/validate')


const { isAuthenticated } = require('../middleware/authenticate')

router
    .get('/', vendorController.getAllVendors)
    .get('/:id', vendorController.getSingleVendor)
    .post('/', isAuthenticated, validation, vendorController.createVendor)
    .put('/:id', isAuthenticated, validation, vendorController.updateVendor)
    .delete('/:id', isAuthenticated, vendorController.deleteVendor)

module.exports = router