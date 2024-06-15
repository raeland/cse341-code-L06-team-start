const router = require('express').Router()

const contactsController = require('../controllers/contacts')
//const vendorController = require('../controllers/vendor')
const validation = require('../middleware/validate')

router
    .get('/', contactsController.getAll)
    .get('/:id', contactsController.getSingle)
    .post('/', validation.saveContact, contactsController.createContact)
    .put('/:id', validation.saveContact, contactsController.updateContact)
    .delete('/:id', contactsController.deleteContact)
    //.get('/', vendorController.getAllVendors)
    .get('/', contactsController.getAll)

module.exports = router
