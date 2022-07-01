const express = require('express')
const router = express.Router()
const { check } = require('express-validator')

const linkCtrl = require('../controllers/linkCtrl')
const auth = require('../middlewares/auth')

router.post('/',[
  check('name', 'name is required').not().isEmpty(),
  check('name_original', 'name is required').not().isEmpty()
  ], auth, linkCtrl.newLink
)

router.get('/', linkCtrl.getLinks)

router.get('/:url', linkCtrl.hasPassword, linkCtrl.getLink)

router.post('/:url', linkCtrl.verifyPassword, linkCtrl.getLink)

module.exports = router