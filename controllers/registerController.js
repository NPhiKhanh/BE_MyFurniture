const User = require('../models/User')
const bcrypt = require('bcrypt')

const handleUser = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({ 'message': 'Usernam and password is required' })

    //check username exist in database
    const isExistUser = await User.findOne({ username: username }).exec()
    if (isExistUser) return res.sendStatus(409)

    try {
        const hashPassword = await bcrypt.hash(password, 10)
        await User.create({
            username: username,
            password: hashPassword
        })

        res.status(201).json({ 'success': `New user is ${username} created` })
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    }
}

module.exports = { handleUser };