const express = require('express');
const { check, validationResult, matchedData } = require('express-validator');
const { authRequired, adminRequired } = require('../auth')
const database = require('../mongo');

const router = express.Router();
const airports = database.collection("airports")

database.listCollections({ name: 'airports' }).next((err, collinfo) => {
    if (collinfo) {
        console.log('Collection Airports already exists. No initialization required.')
    } else {
        console.log('Initializing Airports.')
        airports.insertMany(Object.values(require("../airports.json")))
    }
})

router.get('/', (req, res) => {
    airports.aggregate([
        { $match: { iata: { $ne: "" } } },
        { $project: { _id: 0, id: "$iata", name: true } }
    ]).toArray((err, val) => {
        if (err) res.sendStatus(500)
        else res.send(val)
    })
})

router.get('/:prop', [
    check('prop').isIn(['icao', 'iata', 'name', 'city', 'state', 'country'])
], (req, res) => {
    const valid = validationResult(req)
    if (!valid.isEmpty()) res.sendStatus(404)
    else {
        airports.distinct(matchedData(req).prop).then(val => {
            res.send(val)
        })
    }
})

router.post('/search', [
    check('icao').optional().isAlpha().withMessage("Invalid ICAO format"),
    check('iata').optional().isAlpha().withMessage("Invalid IATA format"),
    check('name').optional().isString().withMessage("Invalid name format"),
    check('city').optional().isString().withMessage("Invalid city format"),
    check('state').optional().isString().withMessage("Invalid state format"),
    check('country').optional().isString().withMessage("Invalid country format"),
], (req, res) => {
    const valid = validationResult(req)
    if (!valid.isEmpty()) res.status(400).send(valid.errors[0].msg)
    else {
        airports.find(matchedData(req)).toArray((err, val) => {
            if (err) res.sendStatus(500)
            else res.send(val)
        })
    }
})

module.exports = router