const express = require('express');
const fs = require('fs')
const { check, validationResult, matchedData } = require('express-validator');

const router = express.Router();

function log(category, message) {
    fs.mkdir('logs', (err) => {
        if (err) console.error('Error creating logs folder: %s', err.message)
        fs.appendFile(`logs/${category}.log`, `[${new Date()}] ${message}\n`, (err) => {
            if (err) console.error('Error writing logs: %s', err.message)
        })
    })
}

router.get('/:category', (req, res, next) => require('../auth').authRequired(req, res, next), (req, res, next) => require('../auth').adminRequired(req, res, next), [
    check('category').notEmpty().isAlphanumeric()
], (req, res) => {
    res.download(`logs/${matchedData(req).category}.log`); 
})

module.exports = {log, router}