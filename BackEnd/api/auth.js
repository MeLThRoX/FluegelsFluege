const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const express = require('express');
const { check, validationResult, matchedData } = require('express-validator');
const log = require('./log')

const router = express.Router();
const users = database.collection("users")

router.post('/login', [
    check('username').notEmpty().isString()
], (req, res) => {
    const valid = validationResult(req)
    if (!valid.isEmpty()) res.status(400).send("Format error")
    else {
        let { username, password } = req.body
        password = createPasswordHash(password)

        users.findOne({ $or: [{ username }, { email: username }], password }).then(value => {
            if (!value) res.status(400).send("Unable to login")
            else {
                const { first_name, last_name, username, email } = value
                const token = jwt.sign({ first_name, last_name, username, email }, config.jsonwebtoken)
                res.cookie('jwt', token).sendStatus(200)
            }
        })
    }
})

router.post('/register', [
    check('first_name').notEmpty().isAlpha().withMessage("Invalid firstname"),
    check('last_name').notEmpty().isAlpha().withMessage("Invalid lastname"),
    check('username').notEmpty().isString().withMessage("Invalid username"),
    check('email').notEmpty().isEmail().withMessage("Invalid email"),
    check('phone').notEmpty().isMobilePhone().withMessage("Invalid phone"),
    check('credit_card').notEmpty().isCreditCard().withMessage("Invalid CC")
], (req, res) => {
    const valid = validationResult(req)
    if (!valid.isEmpty()) res.status(400).send(valid.errors[0].msg)
    else {
        password = crypto.createHash('sha256').update(req.body.password).digest('hex')

        users.insertOne({ ...matchedData(req), password, admin: false }).then(() => {
            const { first_name, last_name, username, email } = matchedData(req)
            const token = jwt.sign({ first_name, last_name, username, email }, config.jsonwebtoken)
            res.cookie('jwt', token).sendStatus(201)
        }).catch(() => {
            res.sendStatus(500)
        })
    }
})

// TODO use salt and another algorithm
function createPasswordHash(password) {
    return crypto.createHash('sha256').update(password).digest('hex')
}

function authRequired(req, res, next) {
    const token = req.cookies.jwt

    if (!token)
    return res.status(401).send('No token, authorisation denied!')
    
    try {
        jwt.verify(token, config.jsonwebtoken, (err, decode) => {
            if (err) throw err;
            
            req.user = decode;
            log('user', `${req.user.username} ${req.method} ${req.originalUrl}`)
            next()
        })
    } catch (e) {
        res.status(400).send('Token is not valid!')
    }
}

function adminRequired(req, res, next) {
    authRequired(req, res, () => { })
    users.findOne({ email: req.user.email }).then(value => {
        if (!value) res.status(403).send("Unable to login")
        else {
            log('admin', `${req.user.username} ${req.method} ${req.originalUrl}`)
            next()
        }
    }).catch(() => {
        res.status(500)
    })
}

module.exports = { router, authRequired, adminRequired, createPasswordHash }