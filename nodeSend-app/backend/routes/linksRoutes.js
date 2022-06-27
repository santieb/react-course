const express = require('express')
const router = express.Router()
const { check } = require('express-validator')

const linkCtrl = require('../controllers/linkCtrl')
const archivesCtrl = require('../controllers/archivesCtrl')
const auth = require('../middlewares/auth')

router.post('/',[
  check('name', 'name is required').not().isEmpty(),
  check('name_original', 'name is required').not().isEmpty()
  ], auth, linkCtrl.newLink
)

router.get('/:url', linkCtrl.getLink, archivesCtrl.deleteFiles)

module.exports = router