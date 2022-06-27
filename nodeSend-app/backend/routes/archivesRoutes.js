const express = require('express')
const router = express.Router()
const { check } = require('express-validator')

const archivesCtrl = require('../controllers/archivesCtrl')
const auth = require('../middlewares/auth')

router.post('/',auth , archivesCtrl.uploadFiles)

router.delete('/:id',auth ,archivesCtrl.deleteFiles)

module.exports = router