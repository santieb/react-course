const express = require('express')
const app = express()
const connectionDB = require('./config/db')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

connectionDB()

const users = require('./routes/userRoutes')
const auth = require('./routes/authRoutes')

app.use('/api/users', users)
app.use('/api/auth', auth)

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening on port ${port}`))

