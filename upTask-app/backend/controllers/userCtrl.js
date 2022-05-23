import User from '../models/userModel.js'
import generateID from '../helpers/generateID.js'
import generateJWT from '../helpers/generateJwt.js'

const userCrtl = {
  login: async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) return res.status(400).json({ message: 'El usuario no existe' })

    const isMatch = await user.comparePassword(password)
    if (!isMatch) return res.status(400).json({ message: 'La contraseña es incorrecta' })

    if(!user.confirmed) return res.status(200).json({ message: 'Tu cuenta no ha sido confirmada' })

    const { id, name } = user
    res.json({ 
      id,
      name,
      email,
      token: generateJWT(id),
    })
  },
  register: async (req, res) => {
    const { name, email, password } = req.body

    const token = generateID()
    const userExists = await User.findOne({ email })

    if (userExists) return res.status(400).json({ message: 'El usuario ya existe' })

    try {
      const user = new User({ name, password, email, token })
      await user.save()

      res.json({ msg: user })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
  confirm: async (req, res) => {
    const { token } = req.params

    const user = await User.findOne({ token })
    if (!user) return res.status(400).json({ message: 'Token no valido' })

    try {
      user.confirmed = true
      user.token = ''
      await user.save()

      res.json({ msg: 'Usuario confirmado correctamente' })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
  forgotPassword: async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'El usuario no existe' })

    try {
      user.token = generateID()
      await user.save()

      res.json({ msg: 'Hemos enviado un email con las instrucciones' })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
  checkToken: async (req, res) => {
    const { token } = req.params

    const user = await User.findOne({ token })
    if (!user) return res.status(400).json({ message: 'Token no valido' })

    res.json({ msg: 'Token valido' })
  },
  newPassword: async (req, res) => {
    const { token } = req.params
    const { password } = req.body
    
    const user = await User.findOne({ token })
    if (!user) return res.status(400).json({ message: 'Token no valido' })

    user.password = password
    user.token= ''

    try {
      await user.save()
      res.json({ msg: 'Contraseña cambiada correctamente' })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  },
  profile: (req, res) => {
    const { user } = req
    res.json({ user })
  }
}

export default userCrtl
