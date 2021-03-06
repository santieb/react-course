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

      existProject.tasks = [...existProject.tasks, task._id]
      await existProject.save()

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
      task.deliveryDate = deliveryDate || task.deliveryDate

      await task.save()
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

      const project = await Project.findById(task.project)
      project.tasks.pull(task._id)

      await Promise.allSettled([project.save(), task.deleteOne()])
      res.json('Tarea eliminada correctamente')
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
  updateStatus: async (req, res) => {
    const { id } = req.params
    try {
      const task = await Task.findById(id).populate('project')

      if (!task) return res.status(404).json({ msg: 'Tarea no encontrada' })

      const isCreator = task.project.creator.toString() === req.user._id.toString()

      const isCollaborator = task.project.collaborators.some(collaborator => collaborator._id.toString() === req.user._id.toString())

      if (!isCreator && !isCollaborator) 
        return res.status(400).json({ msg: 'Acción no válida' })

      task.status = !task.status
      task.completed = req.user._id

      await task.save()

      const taskSaved = await Task.findById(id)
      .populate('project')
      .populate('completed')

      res.json(taskSaved)
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
}

export default projectCtrl
