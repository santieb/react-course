const express = require('express')
const app = express()
const connectionDB = require('./config/db')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

connectionDB()

const users = require('./routes/userRoutes')
const auth = require('./routes/authRoutes')
const links = require('./routes/linksRoutes')
const archives = require('./routes/archivesRoutes')

app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api/links', links)
app.use('/api/archives', archives)

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`listening on port ${port}`))

