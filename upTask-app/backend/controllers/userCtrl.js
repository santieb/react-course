import User from '../models/userModel.js'

const userCrtl = {
  hello: (req, res) => {
    res.send("hello")
  },
  register: async (req, res) => {

    const { name, email, password } = req.body
    const userExists = await User.findOne({ email })

    if (userExists) {
      const error = new Error (`User ${email} already exists`)
      return res.status(400).json({ msg: error.message })
    }

    try {
      const user = new User(req.body)
      await user.save
      res.json(user)
    } catch (err) {
      res.json('error', err)
    }
  }
}

export default userCrtl
