import express from 'express'
const router = express.Router()

import taskCtrl from '../controllers/taskCtrl.js'
import auth from '../middlewares/auth.js'

router.post('/', auth, taskCtrl.addTask)

router.route('/:id')
  .get(auth, taskCtrl.getTask)
  .put(auth, taskCtrl.updateTask)
  .delete(auth, taskCtrl.deleteTask)

router.post('/status/:id', auth, taskCtrl.updateStatus)

export default router