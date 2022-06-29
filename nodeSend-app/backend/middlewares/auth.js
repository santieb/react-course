const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
  const authHeader = req.get('Authorization');

  if (authHeader) {
    const token = authHeader.split(' ')[1]
    try {
      const user = jwt.verify(token, process.env.SIGNATURE_TOKEN)
      req.user = user
    } catch (err) {
      console.log({ error: err.message })
    }
  }
  return next()
}

module.exports = auth