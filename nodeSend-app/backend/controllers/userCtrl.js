const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

const userCtrl = {
  register: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    const { name, email, password } = req.body

    const userExist = await User.exists({ email: email })
    if (userExist) return res.status(400).json({ msg: 'This email already exists' })

    try {
      const passwordHashed = await bcrypt.hash(password, 8)

      const user = await new User({ name, password: passwordHashed, email })
      await user.save()

      res.send({ msg: 'User successfully registered' })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
}

module.exports = userCtrl