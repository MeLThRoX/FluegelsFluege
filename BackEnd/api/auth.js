const jwt = require('jsonwebtoken')
const crypto = require('crypto');
const express = require('express');
const { check, validationResult, matchedData } = require('express-validator');
const log = require('./log')
const database = require('./mongo')

const router = express.Router();
const users = database.collection("users")

let loginAttempts = []

router.post('/login', [
    check('username').notEmpty().isString()
], (req, res) => {
    if (!loginAttempts[req.connection.remoteAddress]) loginAttempts[req.connection.remoteAddress] = { count: 0 }
    if (loginAttempts[req.connection.remoteAddress].count >= 3) {
        if (new Date() - loginAttempts[req.connection.remoteAddress].lastFailure > 5000)
            loginAttempts[req.connection.remoteAddress].count = 0;
        else {
            loginAttempts[req.connection.remoteAddress].lastFailure = new Date();
            res.status(400).send("To many login attemtps")
            return
        }
    }

    const valid = validationResult(req)
    if (!valid.isEmpty()) res.status(400).send("Format error")
    else {
        let { username, password } = req.body
        password = createPasswordHash(password)

        users.findOne({ $or: [{ username }, { email: username }], password }).then(value => {
            if (!value) {
                loginAttempts[req.connection.remoteAddress] = {
                    count: loginAttempts[req.connection.remoteAddress].count + 1,
                    lastFailure: new Date()
                }
                res.status(400).send("Unable to login")
            }
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
        checkPwnedPassword(req.body.password).then(pwned => {
            if (pwned) res.status(400).send("This password is PWNED! Check done by https://haveibeenpwned.com.")
            else {
                password = createPasswordHash(req.body.password)

                users.insertOne({ ...matchedData(req), password, admin: false }).then(() => {
                    const { first_name, last_name, username, email } = matchedData(req)
                    const token = jwt.sign({ first_name, last_name, username, email }, config.jsonwebtoken)
                    res.cookie('jwt', token).sendStatus(201)
                }).catch(error => {
                    if (error.code == 11000) res.status(400).send(Object.keys(error.keyValue)[0] + " is already in use.")
                    else res.sendStatus(400)
                })
            }
        })
    }
})

async function checkPwnedPassword(password) {
    const hash = crypto.createHash('sha1').update(password).digest('hex').toUpperCase()
    const prefix = hash.substring(0, 5)
    const suffix = hash.slice(5)

    let res = await require('node-fetch')(`https://api.pwnedpasswords.com/range/${prefix}`)
    if (res.ok) {
        let data = await res.text()
        return data.includes(suffix)
    }
}

function createPasswordHash(password) {
    return crypto.scryptSync(password, config.password_salt, 64).toString('hex')
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
    users.findOne({ email: req.user.email }).then(value => {
        if (value.admin == true) {
            log('admin', `${req.user.username} ${req.method} ${req.originalUrl}`)
            next()
        } else res.sendStatus(401)
    }).catch(() => {
        res.status(500)
    })
}

module.exports = { router, authRequired, adminRequired, createPasswordHash, checkPwnedPassword }