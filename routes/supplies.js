const router = require('express').Router()
const suppliesController = require('../controllers/supplies')
const validation = require('../middleware/validate')
const { isAuthenticated } = require('../middleware/authenticate')

//const suppliesController = require('../controllers/supplies')

router
    .get('/', suppliesController.getAllItems)
    .get('/:id', suppliesController.getSingleItem)
    .post('/', isAuthenticated, validation, suppliesController.createItem)
    .put('/:id', isAuthenticated, validation, suppliesController.updateItem)
    .delete('/:id', isAuthenticated, suppliesController.deleteItem)

module.exports = router