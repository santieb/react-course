import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import connectionDB from './config/db.js'

const app = express()
dotenv.config()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

connectionDB()

const whiteList = [process.env.FRONTEND_URL]
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))

import userRoutes from './routes/userRoutes.js'
import projectRoutes from './routes/projectRoutes.js'
import taskRoutes from './routes/taskRoutes.js'

app.use('/api/users', userRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/tasks', taskRoutes)

const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => console.log(`listening on port ${PORT}`))

import { Server } from 'socket.io'

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONTEND_URL
  }
})

io.on("connection", (socket) => {
  console.log('connected to the socket.io server')

  socket.on('open project', (idProject) => {
    socket.join(idProject)
  })

  socket.on('new task', task => {
    const project = task.project
    socket.to(project).emit('task added', task)
  })

  socket.on('delete task', task => {
    const project = task.project
    socket.to(project).emit('task deleted', task)
  })

  socket.on('update task', task => {
    const project = task.project._id

    socket.to(project).emit('task updated', task)
  })

  socket.on('update state', task => {
    const project = task.project._id
    socket.to(project).emit('state updated', task)
  })
})