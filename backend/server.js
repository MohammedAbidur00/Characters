const express = require('express')
const app = express()
const pool = require('./db')
const userRouter = require('./routes/users')
const authRouter = require('./routes/auth')
const cors = require('cors')
const cookieParser = require('cookie-parser')

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/users', userRouter)
app.use('/auth', authRouter)

app.use((req, res) => {
    res.status(404).json({ message: 'route not found'});
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({ message: 'something went wrong'})
})

pool.query('SELECT 1')
  .then(() => {
    console.log('Database connected')
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000')
    })
  })
  .catch((err) => {
    console.error('Database connection failed:', err)
    process.exit(1)
})