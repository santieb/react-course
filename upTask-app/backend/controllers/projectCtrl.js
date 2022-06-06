import Project from '../models/projectModel.js'
import Task from '../models/taskModel.js'
import User from '../models/userModel.js'

const projectCtrl = {
  getProject: async (req, res) => {
    const { id } = req.params
    try {
      const project = await Project.findById(id)
        .populate({
           path: 'tasks', 
           populate: { path: 'completed', select: 'name'} 
        })
        .populate('collaborators', 'name email')

      if(!project) return res.status(404).json({ msg: 'No se encontró el proyecto', select: 'name' })

      const isCreator = project.creator.toString() === req.user._id.toString()

      const isCollaborator = project.collaborators.some(collaborator => collaborator._id.toString() === req.user._id.toString())

      if (!isCreator && !isCollaborator) 
        return res.status(400).json({ msg: 'No tienes permisos para este proyecto' })

      res.json(project)
    } catch (e) {
      res.status(500).json({ msg: 'No encontrado' })
    }
  },
  getProjects: async (req, res) => {
    const { id } =  req.user

    const projects = await Project.find({
      '$or': [
        { 'collaborators': { $in: id }},
        { 'creator': { $in: id }}
      ]
    }).select('-tasks')

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
    const { id } = req.params
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
  searchCollaborator: async (req, res) => {
    const { email } = req.body

    try {
      const user = await User.findOne({ email: email}).select(
        '-confirmed -createdAt -password -token -updatedAt -__v')

      if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' })
      res.json({ user })
    }
    catch (err) {
      res.status(404).json({ msg: 'Usuario no encontrado' })
    }
  },
  addCollaborator: async (req, res) => {
    const { id } = req.params
    const { email } = req.body

    try {
      const project = await Project.findById(id)
      if (!project) return res.status(404).json({ msg: 'No se encontró el proyecto' })

      if (project.creator.toString() !==  req.user._id.toString()) 
        return res.status(401).json({ msg: 'Acción no válida' })

      const user = await User.findOne({ email: email}).select(
        '-confirmed -createdAt -password -token -updatedAt -__v')

      if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' })

      if (project.creator.toString() ===  user._id.toString())
        return res.status(404).json({ msg: 'El creador del proyecto no puede ser colaborador' })

      if (project.collaborators.includes(user._id))
        return res.status(404).json({ msg: 'El usuario ya es colaborador' })

      project.collaborators.push(user._id)
      await project.save()

      res.json({ msg: 'Colaborador agregado correctamente' })
    }
    catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
  deleteCollaborator: async (req, res) => {
    const { id, idCollaborator } = req.params

    try {
      const project = await Project.findById(id)
      if (!project) return res.status(404).json({ msg: 'No se encontró el proyecto' })

      if (project.creator.toString() !==  req.user._id.toString()) 
        return res.status(401).json({ msg: 'Acción no válida' })

      project.collaborators.pull(idCollaborator)
      await project.save()

      res.json({ msg: 'Colaborador eliminado correctamente' })
    } catch (err) {
    res.status(500).json({ error: err.message })
    }
  }
}

export default projectCtrl
