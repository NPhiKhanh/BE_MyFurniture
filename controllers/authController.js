const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authHandler = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ 'message': 'Usernam and password is required' })

    //check username exist in database
    const existUser = await User.findOne({ username: username }).exec();
    if (!existUser) return res.sendStatus(401) //unauthorized

    const matchingPassword = await bcrypt.compare(password, existUser.password);
    if (matchingPassword) {
        //created JWT
        const accessToken = jwt.sign(
            { "username": existUser.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1m' }
        )
        const refreshToken = jwt.sign(
            { "username": existUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1y' }
        )
        //Storing in database
        existUser.refreshToken = refreshToken;
        await existUser.save();

        res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        res.json({ "accessToken": accessToken })
    } else {
        return res.sendStatus(401)
    }

}
module.exports = { authHandler }