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
app.listen(PORT, () => console.log(`listening on port ${PORT}`))