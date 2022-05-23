import dotenv from 'dotenv'
import express from 'express'
import connectionDB from './config/db.js'

const app = express()
dotenv.config()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

connectionDB()

import userRoutes from './routes/userRoutes.js'
import projectRoutes from './routes/projectRoutes.js'

app.use('/api/users', userRoutes)
app.use('/api/projects', projectRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`listening on port ${PORT}`))