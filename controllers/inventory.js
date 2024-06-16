const mongodb = require('../db/connect')
const ObjectId = require('mongodb').ObjectId

const getAllItems = async (req, res) => {
    //#swagger.tags=['Inventory']
    try {
        const result = await mongodb.getDatabase().db().collection('inventory').find()
        result.toArray().then((items) => {
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json(items)
        })     
    } catch (error) {
        res.status(500).json(`An error occured: ${error}`)
    }
}

const getSingleItem = async (req, res) => {
    //#swagger.tags=['Inventory']
    try {
        const itemId = new ObjectId(req.params.id)
        const result = await mongodb.getDatabase().db().collection('inventory').find({ _id: itemId })
        result.toArray().then((items) => {
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json(items[0])
        });            
    } catch (error) {
        res.status(500).json(`An error occured: ${error}`)
    }
}

const createItem = async (req, res) => {
    //#swagger.tags=['Inventory']
      const item = {
        sku: req.body.sku,
        name: req.body.name,
        description: req.body.description,
        unit: req.body.unit,
        unit_weight: req.body.unit_weight,
        unit_cost: req.body.unit_cost,
        stock: req.body.stock
    }
    const response = await mongodb.getDatabase().db().collection('inventory').insertOne(item)
    if (response.acknowledged) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error occured while creating the item.')
    }
}

const updateItem = async (req, res) => {
    //#swagger.tags=['Inventory']
    const itemId = new ObjectId(req.params.id)
    const item = {
        sku: req.body.sku,
        name: req.body.name,
        description: req.body.description,
        unit: req.body.unit,
        unit_weight: req.body.unit_weight,
        unit_cost: req.body.unit_cost,
        stock: req.body.stock,
    }
    const response = await mongodb.getDatabase().db().collection('inventory').replaceOne({ _id: itemId }, item)
    if (response.modifiedCount > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the item.')
    }
}

const deleteItem = async (req, res) => {
    //#swagger.tags=['Inventory']
    try {
        const itemId = new ObjectId(req.params.id)
        const response = await mongodb.getDatabase().db().collection('inventory').deleteOne({ _id: itemId })          
        if (response.deletedCount > 0) {
            res.status(204).send()
        }
    } catch (error) {
        res.status(500).json(`An error occured: ${error}`)
    }
}

module.exports = {
    getAllItems,
    getSingleItem,
    createItem,
    updateItem,
    deleteItem
}