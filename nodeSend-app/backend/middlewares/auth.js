const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (authHeader) {
    const token = authHeader.split(' ')[1]
    try {
      const user = jwt.verify(token, process.env.SIGNATURE_TOKEN)
      req.user = user
      return next()
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  }
}

module.exports = auth