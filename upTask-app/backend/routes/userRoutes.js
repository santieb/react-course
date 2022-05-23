import express from 'express'
const router = express.Router()

import userCrtl from '../controllers/userCtrl.js'
import auth from '../middlewares/auth.js'

router.post('/login', userCrtl.login)
router.post('/register', userCrtl.register)
router.get('/confirm/:token', userCrtl.confirm)
router.post('/forgot-password', userCrtl.forgotPassword)
router.route('/forgot-password/:token')
  .get(userCrtl.checkToken)
  .post(userCrtl.newPassword)
router.get('/profile', auth, userCrtl.profile)

export default router