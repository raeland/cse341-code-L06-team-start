const mongodb = require('../db/connect')
const ObjectId = require('mongodb').ObjectId

const getAllVendors = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('vendor').find()
        result.toArray().then((vendors) => {
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json(vendors)
        })          
    } catch (error) {
        res.status(500).json(`An error occured: ${error}`);  
    }
}

const getSingleVendor = async (req, res) => {
    try {
        const vendorId = new ObjectId(req.params.id)
        const result = await mongodb.getDatabase().db().collection('vendor').find({ _id: vendorId })
        result.toArray().then((vendors) => {
            res.setHeader('Content-Type', 'application/json')
            res.status(200).json(vendors[0])
        })          
    } catch (error) {
        res.status(500).json(`An error occured: ${error}`)
    }
}

const createVendor = async (req, res) => {
    const vendor = {
        vendor: req.body.vendor,
        address: req.body.address,
        phone: req.body.phone,
        url: req.body.url
    }
    const response = await mongodb.getDatabase().db().collection('vendor').insertOne(vendor)
    if (response.acknowledged) {
        res.status(204).send()
    } else {
        res.status(500).json(response.error || 'Some error occured while creating the item.')
    }
}

const updateVendor = async (req, res) => {
    try {
        const vendorId = new ObjectId(req.params.id)
        const vendor = {
            vendor: req.body.vendor,
            address: req.body.address,
            phone: req.body.phone,
            url: req.body.url
        }
        const response = await mongodb.getDatabase().db().collection('vendor').replaceOne({ _id: vendorId }, vendor)          
        if (response.modifiedCount > 0) {
            res.status(204).send()
        }
    } catch (error) {
        res.status(500).json(`Error occured: ${error}`)
    }
}

const deleteVendor = async (req, res) => {
    try {
        const vendorId = new ObjectId(req.params.id)
        const response = await mongodb.getDatabase().db().collection('vendor').deleteOne({ _id: vendorId })          
        if (response.deletedCount > 0) {
            res.status(204).send()
        }
    } catch (error) {
        res.status(500).json(`An error occured: ${error}`)
    }
}


module.exports = {
    getAllVendors,
    getSingleVendor,
    createVendor,
    updateVendor,
    deleteVendor
}