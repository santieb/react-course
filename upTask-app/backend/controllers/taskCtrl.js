import Project from '../models/projectModel.js'
import Task from '../models/taskModel.js'

const projectCtrl = {
  getTask: async (req, res) => {
    const { id } = req.params
    try {
      const task = await Task.findById(id).populate('project')

      if (!task) return res.status(404).json({ msg: 'Tarea no encontrada' })
  
      if (task.project.creator.toString() !== req.user._id.toString()) return res.status(403).json({ msg: 'Acción no valida' })
  
      res.json(task)
    } catch (err) {
      res.status(500).json({ msg: 'No se encontró el proyecto' })
    }
  },
  addTask: async (req, res) => {
    const { name, description, priority, project } =  req.body
    try {
      const existProject = await Project.findById(project)
      if (!existProject) return res.status(404).json({ msg: 'No se encontró el proyecto' })

      if (existProject.creator.toString() !== req.user._id.toString()) return res.status(400).json({ msg: 'No tienes permisos para añadir tareas' })

      const task = await Task.create({ name, description, priority, project })

      res.json(task)
    } catch (err) {
      res.status(500).json({ msg: 'No se encontró el proyecto'})
    }
  },
  updateTask: async (req, res) => {
    const { id } = req.params
    try {
      const task = await Task.findById(id).populate('project')

      if (!task) return res.status(404).json({ msg: 'Tarea no encontrada' })
  
      if (task.project.creator.toString() !== req.user._id.toString()) return res.status(403).json({ msg: 'Acción no valida' })
  
      const { name, description, priority, deliveryDate } = req.body

      task.name = name || task.name
      task.description = description || task.description
      task.priority = priority || task.priority
      task.deliveryDate = task.deliveryDate || task.deliveryDate

      res.json(task)
    } catch (err) {
      res.status(500).json({ msg: 'No se encontró el proyecto'})
    }
  },
  deleteTask: async(req, res) => {
    const { id} = req.params
    try {
      const task = await Task.findById(id).populate('project')

      if (!task) return res.status(404).json({ msg: 'Tarea no encontrada' })
  
      if (task.project.creator.toString() !== req.user._id.toString()) return res.status(403).json({ msg: 'Acción no valida' })

      await task.deleteOne()
      res.json('Tarea eliminada correctamente')
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
  updateStatus: async (req, res) => {
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
  }
}

export default projectCtrl
