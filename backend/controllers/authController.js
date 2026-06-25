const pool = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { registerSchema, loginSchema } = require('../validators/authValidator')

const register = async (req, res) => { 
  try {
    const validation = registerSchema.safeParse(req.body)

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.flatten().fieldErrors })
    }

    const { username, email, password } = validation.data

    // hash the password before saving
    const saltRounds = 10
    const password_hash = await bcrypt.hash(password, saltRounds)

    const result = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, password_hash]
    )

    const user = result.rows[0]

    // create a token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.cookie('token', token, {
      httpOnly: true,    // JS cannot access this cookie
      secure: false,     // set to true in production (requires HTTPS)
      sameSite: 'lax',  // protects against CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days in milliseconds
    })
    
    res.json({ message: 'Registered successfully', username: user.username })
  } catch (err) {
    console.error(err)

    if (err.code === "23505") {
        return res.status(409).json({ error: 'Email or username already exists'})
    }

    res.status(500).json({ error: 'Something went wrong' })
  }
}

const login = async (req, res) => {
  try {
    const validation = loginSchema.safeParse(req.body)

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.flatten().fieldErrors })
    }

    const { email, password } = validation.data

    // find the user
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    )

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const user = result.rows[0]

    // check the password
    const match = await bcrypt.compare(password, user.password_hash)

    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // create a token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.cookie('token', token, {
      httpOnly: true,    // JS cannot access this cookie
      secure: false,     // set to true in production (requires HTTPS)
      sameSite: 'lax',  // protects against CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days in milliseconds
    })
    
    res.json({ message: 'Logged in successfully', username: user.username })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Something went wrong' })
  }
}

const getMe = async (req, res) => {
  const id = req.user.id
  const result = await pool.query('SELECT username, email FROM users WHERE id = $1', [id]);
  const user = result.rows[0];
  res.json({ id: req.user.id, username: user.username, email: user.email})
}

const logout = (req, res) => {
  res.clearCookie('token')
  res.json({ message: 'Logged out' })
}

module.exports = { register, login, getMe, logout }