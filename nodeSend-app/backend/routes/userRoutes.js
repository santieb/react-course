const express = require('express')
const router = express.Router()
const { check } = require('express-validator')

const userCtrl = require('../controllers/userCtrl')

router.post('/register', [
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is invalid').isEmail(),
    check('password', 'The password is invalid').isLength({ min: 6 }),
  ], userCtrl.register
)

module.exports = router