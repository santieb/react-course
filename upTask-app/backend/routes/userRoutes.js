import express from 'express'
const router = express.Router()

import userCrtl from '../controllers/userCtrl.js'

router.get('/', userCrtl.hello)

router.post('/', userCrtl.register)

export default router