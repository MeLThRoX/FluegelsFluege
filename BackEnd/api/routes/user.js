const { ObjectId } = require('bson');
const express = require('express');
const { check, validationResult, matchedData } = require('express-validator');
const { authRequired, adminRequired, createPasswordHash, checkPwnedPassword } = require('../auth')
const database = require('../mongo')
const mail = require('../mail')

const router = express.Router();
const users = database.collection("users")
const passwordVerifications = database.collection("password-verifications")

database.listCollections({ name: 'users' }).next((err, collinfo) => {
    if (collinfo) {
        console.log('Collection Users already exists. No initialization required.')
    } else {
        console.log('Initializing Users.')
        users.createIndexes([
            { name: 'Username already taken', key: { 'username': 1 }, unique: true },
            { name: 'Email already taken', key: { 'email': 1 }, unique: true },
            { name: 'Phone number already taken', key: { 'phone': 1 }, unique: true }
        ])
    }
})

users.find({ username: 'admin', admin: true }).toArray((err, adminUsers) => {
    if (err) console.log('Unable to fetch admin users.')
    else {
        if (!adminUsers.length) {
            users.insertOne({
                first_name: 'admin',
                last_name: 'admin',
                username: 'admin',
                email: 'admin@admin.com',
                phone: '0',
                credit_card: '0',
                password: createPasswordHash(process.env.ADMIN_PASSWORD || 'admin'),
                admin: true
            }).then(() => {
                console.log('No admin user found! Created new admin user.')
            }).catch(() => {
                console.log('Unable to create admin user.')
            })
        } else {
            console.log('Availible admin users:\n%o', adminUsers)
        }
    }
})

router.get('/', authRequired, (req, res) => {
    users.findOne({ email: req.user.email }).then(value => {
        delete value.password
        delete value.admin
        let x = value.credit_card.replace(/ /g, '')
        value.credit_card = x.substring(0, 2) + '** **** **** **' + x.substring(14, 16)
        res.send(value)
    }).catch(() => {
        res.status(500)
    })
})

router.get('/updatePassword/:_id', [
    check('_id').notEmpty().isMongoId().customSanitizer(v => ObjectId(v))
], (req, res) => {
    const valid = validationResult(req)
    if (!valid.isEmpty()) res.sendStatus(400)
    else {
        passwordVerifications.findOneAndDelete(matchedData(req), (err, verificationResult) => {
            if (err) res.sendStatus(400)
            else {
                users.findOneAndUpdate({ email: verificationResult.value.email }, { $set: { password: verificationResult.value.password } }, (err, updateResult) => {
                    if (err) res.sendStatus(400)
                    else res.send("Your password has changed!")
                })
            }
        })
    }
})

router.patch('/', authRequired, [
    check('first_name').optional().isAlpha().withMessage("Invalid firstname"),
    check('last_name').optional().isAlpha().withMessage("Invalid lastname"),
    check('username').optional().isString().withMessage("Invalid username"),
    check('email').optional().isEmail().withMessage("Invalid email"),
    check('phone').optional().isMobilePhone().withMessage("Invalid phone"),
    check('credit_card').optional().isCreditCard().withMessage("Invalid CC")
], (req, res) => {
    const valid = validationResult(req)
    if (!valid.isEmpty()) res.status(400).send(valid.errors[0].msg)
    else {
        updateData = matchedData(req)
        promises = []

        promises.push(new Promise((resolve, reject) => {
            if (req.body.password) {
                checkPwnedPassword(req.body.password).then(pwned => {
                    if (pwned) reject("This password is PWNED! Check done by https://haveibeenpwned.com.")
                    else {
                        passwordVerifications.insertOne({ password: createPasswordHash(req.body.password), email: req.user.email }, (err, result) => {
                            if (err) reject("Failed sending Mail")
                            else {
                                mail.sendMail(req.user.email, 'Password Verification', `http://${config.host}/api/user/updatePassword/${result.insertedId.toString()}`)
                                resolve("Apply new password by clicking the verification-link sent to your E-Mail.")
                            }
                        })
                    }
                })
            }
        }))

        promises.push(new Promise((resolve, reject) => {
            users.findOneAndUpdate({ email: req.user.email }, { $set: updateData }, (err) => {
                if (err) reject("Updating information failed")
                else resolve("User information updated.")
            })
        }))

        Promise.all(promises).then(values => {
            res.send(values)
        }).catch((reason) => {
            res.status(400).send(reason)
        })
    }
})

router.post('/create', authRequired, adminRequired, [
    check('first_name').notEmpty().isAlpha().withMessage("Invalid firstname"),
    check('last_name').notEmpty().isAlpha().withMessage("Invalid lastname"),
    check('username').notEmpty().isString().withMessage("Invalid username"),
    check('email').notEmpty().isEmail().withMessage("Invalid email"),
    check('phone').notEmpty().isMobilePhone().withMessage("Invalid phone"),
    check('credit_card').notEmpty().isCreditCard().withMessage("Invalid CC"),
    check('admin').notEmpty().isBoolean().withMessage("Invalid admin parameter")
], (req, res) => {
    const valid = validationResult(req)
    if (!valid.isEmpty()) res.status(400).send(valid.errors[0].msg)
    else {
        users.insertOne({ ...matchedData(req), password: createPasswordHash(req.body.password) }).then(() => {
            res.sendStatus(201)
        }).catch(() => {
            res.sendStatus(500)
        })
    }
})

router.post('/read', authRequired, adminRequired, [
    check('_id').optional().isMongoId().customSanitizer(v => ObjectId(v)).withMessage("Invalid firstname"),
    check('first_name').optional().isAlpha().withMessage("Invalid firstname"),
    check('last_name').optional().isAlpha().withMessage("Invalid lastname"),
    check('username').optional().isString().withMessage("Invalid username"),
    check('email').optional().isEmail().withMessage("Invalid email"),
    check('phone').optional().isMobilePhone().withMessage("Invalid phone"),
    check('credit_card').optional().isCreditCard().withMessage("Invalid CC"),
    check('admin').optional().isBoolean().withMessage("Invalid admin parameter")
], (req, res) => {
    const valid = validationResult(req)
    if (!valid.isEmpty()) {
        res.status(400).send(valid.errors[0].msg)
    } else {
        users.find(matchedData(req)).toArray((err, val) => {
            if (err) res.sendStatus(500)
            else res.send(val)
        })
    }
})

router.post('/update', authRequired, adminRequired, [
    check('find._id').optional().isMongoId().customSanitizer(v => ObjectId(v)).withMessage("Invalid ID Format In Find"),
    check('find.first_name').optional().isAlpha().withMessage("Invalid Firstname Format In Find"),
    check('find.last_name').optional().isAlpha().withMessage("Invalid Lastname Format In Find"),
    check('find.username').optional().isString().withMessage("Invalid Username Format In Find"),
    check('find.email').optional().isEmail().withMessage("Invalid Email Format In Find"),
    check('find.phone').optional().isMobilePhone().withMessage("Invalid Phone Format In Find"),
    check('find.credit_card').optional().isCreditCard().withMessage("Invalid CC Format In Find"),
    check('find.admin').optional().isBoolean().withMessage("Invalid Admin Format In Find"),
    check('update.first_name').optional().isAlpha().withMessage("Invalid Firstname Format In Update"),
    check('update.last_name').optional().isAlpha().withMessage("Invalid Lastname Format In Update"),
    check('update.username').optional().isString().withMessage("Invalid Username In Update"),
    check('update.email').optional().isEmail().withMessage("Invalid Email Format In Update"),
    check('update.phone').optional().isMobilePhone().withMessage("Invalid Phone Format In Update"),
    check('update.credit_card').optional().isCreditCard().withMessage("Invalid CC Format In Update"),
    check('update.admin').optional().isBoolean().withMessage("Invalid Admin parameter In Update")
], (req, res) => {
    const valid = validationResult(req)
    if (!valid.isEmpty()) res.status(400).send(valid.errors[0].msg)
    else {
        users.findOneAndUpdate(matchedData(req).find, { $set: matchedData(req).update }, (err, val) => {
            if (err) res.sendStatus(400)
            else res.sendStatus(200)
        })
    }
})

router.post('/delete', authRequired, adminRequired, [
    check('_id').optional().isMongoId().customSanitizer(v => ObjectId(v)).withMessage("Invalid firstname"),
    check('first_name').optional().isAlpha().withMessage("Invalid firstname"),
    check('last_name').optional().isAlpha().withMessage("Invalid lastname"),
    check('username').optional().isString().withMessage("Invalid username"),
    check('email').optional().isEmail().withMessage("Invalid email"),
    check('phone').optional().isMobilePhone().withMessage("Invalid phone"),
    check('credit_card').optional().isCreditCard().withMessage("Invalid CC")
], (req, res) => {
    users.findOneAndDelete(req.body).then(v => {
        if (!v) res.sendStatus(404)
        else res.sendStatus(200)
    }).catch(() => {
        res.sendStatus(500)
    })
})

router.post('/isAdmin', authRequired, (req, res) => {
    users.findOne({ email: req.user.email }).then(value => {
        res.send(value.admin)
    }).catch(() => {
        res.status(500)
    })
})

module.exports = router