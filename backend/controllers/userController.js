const pool = require('../db')

const getUsers = async (req, res) => {
    try {
        const result = await pool.query("SELECT id, username, email FROM users")
        res.status(200).json(result.rows)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Something went wrong" })
    }
}

const getUser = async (req, res) => {
    try {
        const { userId } = req.params
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [userId])
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found" })
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Something went wrong" })
    }
}

module.exports = { getUsers, getUser }