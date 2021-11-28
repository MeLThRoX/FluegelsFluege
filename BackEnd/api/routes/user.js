const express = require('express');
const { check, validationResult, matchedData } = require('express-validator');
const { authRequired, adminRequired, createPasswordHash } = require('../auth')

const router = express.Router();
const users = database.collection("users")

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
            console.log('Availible admin users:')
            console.log(adminUsers)
        }
    }
})

router.get('/', authRequired, (req, res) => {
    users.findOne({ email: req.user.email }).then(value => {
        delete value.password
        delete value.admin
        res.send(value)
    }).catch(() => {
        res.status(500)
    })
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
        if (req.body.password) updateData.password = createPasswordHash(req.body.password)
        users.findOneAndUpdate({ email: req.user.email }, { $set: updateData }, () => {
            res.sendStatus(200)
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
        users.findOne(matchedData(req)).then(v => {
            if (v) res.send(v)
            else res.sendStatus(404)
        }).catch(() => {
            res.sendStatus(500)
        })
    }
})

// TODO sanatize
router.post('/update', authRequired, adminRequired, (req, res) => {
    users.findOneAndUpdate(req.body.find, { $set: req.body.update }, () => {
        res.sendStatus(200)
    })
})

router.post('/delete', authRequired, adminRequired, [
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