const jwt = require('jsonwebtoken')

const protect = (req, res, next) => {
    const token = req.cookies.token
  
    if (!token) {
      return res.status(401).json({ error: 'Not logged in' })
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = decoded
      next()
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' })
    }
}

module.exports = protect