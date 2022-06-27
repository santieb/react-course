require('dotenv').config({ path: '.env' })
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

const authCtrl = {
  login: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    try {
      const { email, password } = req.body

      const user = await User.findOne({ email })
      if(!user) return res.status(400).json({ msg: 'This user not exists' })

      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) return res.status(400).json({ msg: 'The password is wrong' })

      const token = jwt.sign({ id: user._id, }, process.env.SIGNATURE_TOKEN, {
        expiresIn: '8h'
      })

      res.send({ token })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
}

module.exports = authCtrl