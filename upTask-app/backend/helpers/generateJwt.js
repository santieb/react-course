import jwt from 'jsonwebtoken'

const generateJWT = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 24 * 60 * 60,
  })
}

export default generateJWT