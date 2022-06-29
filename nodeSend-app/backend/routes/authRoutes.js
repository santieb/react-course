const express = require('express')
const router = express.Router()
const { check } = require('express-validator')

const authCtrl = require('../controllers/authCtrl')
const auth = require('../middlewares/auth')

router.post('/login', [
    check('email', 'The email is invalid').isEmail()
  ], authCtrl.login
)

router.get('/',auth , authCtrl.userAuth)

module.exports = router