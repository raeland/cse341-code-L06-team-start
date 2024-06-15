const router = require('express').Router();

const { validateItem, validate } = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

const inventoryController = require('../controllers/inventory');

router
    .get('/', inventoryController.getAllItems)
    .get('/:id', inventoryController.getSingleItem)
    .post('/', isAuthenticated, validateItem(), validate, inventoryController.createItem)
    .put('/:id', isAuthenticated, validateItem(), validate, inventoryController.updateItem)
    .delete('/:id', isAuthenticated, inventoryController.deleteItem);

module.exports = router;