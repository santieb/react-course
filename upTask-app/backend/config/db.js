import mongoose from 'mongoose'

const connectionDB = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.MONGO_URI, { 
        useUnifiedTopology: true,
        useNewUrlParser: true
      }
    ) 
    const url = `${connection.connection.host}:${connection.connection.port}`
    console.log(`MongoDB connected at ${url}`)
  } catch (err) {
    console.log('error', err)
    process.exit(1)
  }
}

export default connectionDB