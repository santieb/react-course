import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true,
    trim: true 
  },
  password: { 
    type: String,
    required: true,
    trim: true 
  },
  email: { 
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  token: { 
    type: String,
  },
  confirmed: { 
    type: Boolean,
    default: false
 },
}, {
  timestamps: true
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next()

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.comparePassword = async function (passwordLogin) {
  return await bcrypt.compare(passwordLogin, this.password)
}

const User = mongoose.model('User', userSchema)
export default User