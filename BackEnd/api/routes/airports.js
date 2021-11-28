const express = require('express');
const { check, validationResult, matchedData } = require('express-validator');
const { authRequired, adminRequired } = require('../auth')
const airports = require("../airports.json")

const router = express.Router();

// TODO 
router.get('/', authRequired, (req, res) => {
    res.sendStatus(200)
})

router.post('/search', authRequired, [
    check('icao').optional().isAlpha().withMessage("Invalid ICAO format"),
    check('iata').optional().isAlpha().withMessage("Invalid IATA format"),
    check('name').optional().isString().withMessage("Invalid name format"),
    check('city').optional().isString().withMessage("Invalid city format"),
    check('state').optional().isString().withMessage("Invalid state format"),
    check('country').optional().isString().withMessage("Invalid country format"),
], (req, res) => {
    let foundAirport = undefined;

    Object.keys(airports).forEach((icao) => {
        const airport = airports[icao]
        Object.keys(airport).forEach((attr) => {
            if (airport[attr] == matchedData(req)[attr]) {
                foundAirport = airport
            }
        })
    })

    if (foundAirport) res.send(foundAirport)
    else res.sendStatus(404)
})

module.exports = router