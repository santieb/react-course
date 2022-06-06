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

router.post('/collaborators', auth, projectCtrl.searchCollaborator)

router.post('/collaborators/:id', auth, projectCtrl.addCollaborator)

router.delete('/collaborators/:id/:idCollaborator', auth, projectCtrl.deleteCollaborator)

export default router