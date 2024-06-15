const router = require('express').Router();

const { validateSupplier, validate } = require('../middleware/validate');

const supplierController = require('../controllers/supplier');

const { isAuthenticated } = require('../middleware/authenticate');

router
    .get('/', supplierController.getAllSuppliers)
    .get('/:id', supplierController.getSingleSupplier)
    .post('/', isAuthenticated, validateSupplier(), validate, supplierController.createSupplier)
    .put('/:id', isAuthenticated, validateSupplier(), validate, supplierController.updateSupplier)
    .delete('/:id', isAuthenticated, supplierController.deleteSupplier);

module.exports = router;