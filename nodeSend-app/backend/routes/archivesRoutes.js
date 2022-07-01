const express = require('express')
const router = express.Router()
const { check } = require('express-validator')

const archivesCtrl = require('../controllers/archivesCtrl')
const auth = require('../middlewares/auth')

router.get('/:id', archivesCtrl.download, archivesCtrl.deleteFiles)

router.post('/',auth , archivesCtrl.uploadFiles)

module.exports = router