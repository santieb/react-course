import Project from '../models/userModel.js'
import generateID from '../helpers/generateID.js'
import generateJWT from '../helpers/generateJwt.js'

const projectCtrl = {
  getProject: async (req, res) => {
    const { token } = req.params
  },
  getProjects: async (req, res) => {
    const { token } = req.params
  },
  newProject: async (req, res) => {
    const { token } = req.params
  },
  updateProject: (req, res) => {
    const { user } = req
    res.json({ user })
  },
  deleteProject: (req, res) => {
    const { user } = req
    res.json({ user })
  },
  addCollaborator: (req, res) => {
    const { user } = req
    res.json({ user })
  },
  deleteCollaborator: (req, res) => {
    const { user } = req
    res.json({ user })
  },
  getTasks: (req, res) => {
    const { user } = req
    res.json({ user })
  },
}

export default projectCtrl
