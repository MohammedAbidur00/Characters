const express = require('express')
const router = express.Router()
const { getUsers, getUser } = require('../controllers/userController')
const protect = require('../middleware/auth')

router.get('/', protect, getUsers)
router.get('/:id', protect, getUser)

module.exports = router