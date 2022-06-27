const mongoose = require('mongoose')
require('dotenv').config({ path: '.env' })

const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('Connected to database')
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = connectionDB