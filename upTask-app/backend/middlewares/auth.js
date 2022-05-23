import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
  try {
    if (!req.header('Authorization')) return res.status(401).json({ msg: 'Autenticación denegada, no hay token' })

    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(400).json({ msg: 'Autenticación denegada, no hay token' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decoded.id).select('-password -__v -confirmed -token -createdAt -updatedAt')
    console.log(req.user)
    next()
  } catch (err) {
    return res.status(404).json({ msg: err })
  }
}

export default auth