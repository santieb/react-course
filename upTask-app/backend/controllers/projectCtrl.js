import Project from '../models/projectModel.js'
import Task from '../models/taskModel.js'

const projectCtrl = {
  getProject: async (req, res) => {
    const { id } = req.params
    try {
      const project = await Project.findById(id)

      if(!project) return res.status(404).json({ msg: 'No se encontró el proyecto' })
  
      if (project.creator.toString() !== req.user._id.toString()) return res.status(400).json({ msg: 'No tienes permisos para este proyecto' })
  
      const tasks = await Task.find({ project: id })

      res.json({ 
        project,
        tasks
      })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  },
  getProjects: async (req, res) => {
    const { id } =  req.user
    const projects = await Project.find({ creator: id })
    res.json(projects)
  },
  newProject: async (req, res) => {
    const { id } =  req.user
    const { name, description, client } = req.body
    const project = new Project({ name, description, client })
    project.creator = id

    try {
      await project.save()
      res.json({ project: project })
    } catch (err) {
      res.status(400).json({ msg: err })
    }
  },
  updateProject: async(req, res) => {
    const { id} = req.params
    try {
      const project = await Project.findById(id)

      if(!project) return res.status(404).json({ msg: 'No se encontró el proyecto' })
  
      if (project.creator.toString() !== req.user._id.toString()) return res.status(400).json({ msg: 'No tienes permisos para este proyecto' })
  
      const { name, description, client, deliveryDate } = req.body
      
      project.name = name || project.name
      project.description = description || project.description
      project.deliveryDate = deliveryDate || project.deliveryDate
      project.client = client || project.client

      await project.save()
      res.json(project)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
  deleteProject: async (req, res) => {
    const { id} = req.params
    try {
      const project = await Project.findById(id)

      if(!project) return res.status(404).json({ msg: 'No se encontró el proyecto' })
  
      if (project.creator.toString() !== req.user._id.toString()) return res.status(400).json({ msg: 'No tienes permisos para este proyecto' })
  
      await project.deleteOne()
      res.json({ msg: 'Proyecto eliminado correctamente' })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
  addCollaborator: async (req, res) => {
    const { user } = req
    res.json({ user })
  },
  deleteCollaborator: async (req, res) => {
    const { user } = req
    res.json({ user })
  },
}

export default projectCtrl
