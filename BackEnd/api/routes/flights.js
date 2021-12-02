const express = require('express');
const { check, validationResult, matchedData } = require('express-validator');
const { authRequired, adminRequired } = require('../auth')
const database = require('../mongo')

const router = express.Router();
const flights = database.collection("flights")
const users = database.collection("users")

router.post('/create', adminRequired, [
    check('orig').notEmpty().isString().withMessage('Invalid Origin Format'),
    check('dest').notEmpty().isString().withMessage('Invalid Destination Format'),
    check('time').notEmpty().isISO8601().toDate().withMessage('Invalid Time Format'),
    check('seats').notEmpty().isInt().withMessage('Invalid Set Number Format'),
    check('price').notEmpty().isFloat().withMessage('Invalid Price Format')
], (req, res) => {
    const valid = validationResult(req)
    if (!valid.isEmpty()) {
        res.status(400).send(valid.errors[0].msg)
    } else {
        flights.insertOne({ ...matchedData(req) }).then(() => {
            res.sendStatus(201)
        }).catch(() => {
            res.sendStatus(500)
        })
    }
})

router.post('/read', adminRequired, [
    check('_id').optional().isMongoId().withMessage('Invalid ID Format'),
    check('orig').optional().isString().withMessage('Invalid origin'),
    check('dest').optional().isString().withMessage('Invalid Destination'),
    check('time').optional().isISO8601().toDate().withMessage('Invalid time'),
    check('seats').optional().isInt().withMessage('Invalid seat number')
], (req, res) => {
    const valid = validationResult(req)
    if (!valid.isEmpty()) {
        res.status(400).send(valid.errors[0].msg)
    } else {
        flights.findOne(matchedData(req)).then(v => {
            if (v) res.send(v)
            else res.sendStatus(404)
        }).catch(() => {
            res.sendStatus(500)
        })
    }
})

// TODO sanatize
router.post('/update', adminRequired, (req, res) => {
    flights.findOneAndUpdate(req.body.find, { $set: req.body.update }, () => {
        res.sendStatus(200)
    })
})

router.post('/delete', adminRequired, [
    check('_id').optional().isMongoId().withMessage('Invalid ID Format'),
    check('orig').optional().isString().withMessage('Invalid Origin Format'),
    check('dest').optional().isString().withMessage('Invalid Destination Format'),
    check('time').optional().isISO8601().toDate().withMessage('Invalid Time Format'),
    check('seats').optional().isInt().withMessage('Invalid Seat Number Format')
], (req, res) => {
    flights.findOneAndDelete(matchedData(req)).then(v => {
        if (!v) res.sendStatus(404)
        else res.sendStatus(200)
    }).catch(() => {
        res.sendStatus(500)
    })
})

router.post('/search', authRequired, [
    check('orig').notEmpty().isAlpha().withMessage('Invalid origin'),
    check('dest').notEmpty().isAlpha().withMessage('Invalid destination'),
    check('time').optional().isISO8601().toDate().customSanitizer(v => ({ $gt: v })).withMessage('Invalid Time Format')
], (req, res) => {
    const valid = validationResult(req)
    if (!valid.isEmpty()) res.status(400).send(valid.errors[0].msg)
    else {
        flights.find(matchedData(req)).toArray((err, v) => {
            if (err) res.sendStatus(500)
            else res.send(v)
        })
    }
})

router.post('/book', authRequired, [
    check('flight_id').optional().isString().withMessage('Invalid Flight-ID Format'),
    check('passengers.*.first_name').notEmpty().isAlpha().withMessage('Invalid Firstname Format'),
    check('passengers.*.last_name').notEmpty().isAlpha().withMessage('Invalid Lastname Format'),
    check('passengers.*.birthdate').notEmpty().isISO8601().toDate().withMessage('Invalid Birthdate Format'),
    check('passengers.*.citizenship').notEmpty().isAlpha().withMessage('Invalid Citizenship Format'),
    check('passengers.*.gender').notEmpty().isAlpha().withMessage('Invalid Gender Format'),
    check('passengers.*.numberPassport').notEmpty().isNumeric().withMessage('Invalid Passport Number Format'),
    check('passengers.*.datePassport').notEmpty().isISO8601().toDate().withMessage('Invalid Passport Date Format')
], (req, res) => {
    const valid = validationResult(req)
    if (!valid.isEmpty()) res.status(400).send(valid.errors[0].msg)
    else {
        flights.findOne({ _id: matchedData(req).flight_id }).then(flight => {
            users.findOneAndUpdate({ ...req.user, iat: undefined }, {
                $push: { tickets: { $each: matchedData(req).passengers.map(passanger => ({ ...passanger, flight_id: matchedData(req).flight_id })) } }
            }).then(user => {
                res.sendStatus(200)
            })
        }).catch(err => {
            res.sendStatus(500)
        })
    }
})

router.post('/passengers', adminRequired, [
    check('flight_id').optional().isString().withMessage('Invalid Flight-ID Format'),
], (req, res) => {
    const valid = validationResult(req)
    if (!valid.isEmpty()) res.status(400).send(valid.errors[0].msg)
    else {
        const { flight_id } = matchedData(req)
        users.aggregate([
            { $match: { 'tickets.flight_id': flight_id } },
            {
                $project: {
                    _id: 0,
                    user_id: '$_id',
                    tickets: {
                        $filter: {
                            input: '$tickets',
                            as: 'ticket',
                            cond: { $eq: ['$$ticket.flight_id', flight_id] }
                        }
                    },
                }
            }
        ]).toArray((err, val) => {
            if (err) res.sendStatus(500)
            else res.send(val)
        })
    }
})

module.exports = router