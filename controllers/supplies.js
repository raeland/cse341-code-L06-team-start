const mongodb = require('../db/connect')
const ObjectId = require('mongodb').ObjectId

// const getAllItems = async (req, res) => {
//     try {
//         const result = await mongodb.getDatabase().db().collection('supplies').find()
//         result.toArray().then((items) => {
//             res.setHeader('Content-Type', 'application/json')
//             res.status(200).json(items)
//         })         
//     } catch (error) {
//         res.status(500).json(`An error occured: ${error}`)
//     }
// }

const getAllItems = async (req, res) => {
    //const result = await 
      mongodb
        .getDb()
        .db()
        .collection('supplies')
        .find()
        .toArray((err, lists) => {
          if (err) {
            res.status(400).json({ message: err })      
          }
      res.setHeader('Content-Type', 'application/json')
      res.status(200).json(lists)
    })
  }

const getSingleItem = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid contact id to get a contact.')
      }
      const userId = new ObjectId(req.params.id)
      //const result = await 
        mongodb
          .getDb()
          .db()
          .collection('supplies')
          .find({ _id: userId })
          .toArray((err, result) => {
            if (err) {
              res.status(400).json({ message: err })      
            }
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(result[0])
      })
    }

const createItem = async (req, res) => {
      const item = {
        sku: req.body.sku,
        name: req.body.name,
        description: req.body.description,
        unit: req.body.unit,
        unit_weight: req.body.unit_weight,
        unit_cost: req.body.unit_cost,
        stock: req.body.stock
    }
    const response = await mongodb.getDatabase().db().collection('supplies').insertOne(item)
    if (response.acknowledged) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error occured while creating the item.')
    }
}

const updateItem = async (req, res) => {
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
    const response = await mongodb.getDatabase().db().collection('supplies').replaceOne({ _id: itemId }, item)
    if (response.modifiedCount > 0) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error occured while updating the item.')
    }
}

const deleteItem = async (req, res) => {
    try {
        const itemId = new ObjectId(req.params.id)
        const response = await mongodb.getDatabase().db().collection('supplies').deleteOne({ _id: itemId })           
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