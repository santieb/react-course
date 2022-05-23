import express from 'express'
const router = express.Router()

import projectCtrl from '../controllers/projectCtrl.js'
import auth from '../middlewares/auth.js'

router.route('/')
  .get(auth, projectCtrl.getProjects)
  .post(auth, projectCtrl.newProject)

router.route('/:id')
  .get(auth, projectCtrl.getProject)
  .put(auth, projectCtrl.updateProject)
  .delete(auth, projectCtrl.deleteProject)

router.route('/collaborator/:id')
  .post(auth, projectCtrl.addCollaborator)
  .post(auth, projectCtrl.deleteCollaborator)

router.get('/tasks/:id', auth, projectCtrl.getTasks)

export default router