const jwt = require('jsonwebtoken')
const User = require('../models/User')

const logOutHandler = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204)

    //check refreshToken exist in database
    const existUser = await User.findOne({ refreshToken: cookies.jwt }).exec();
    if (!existUser) {
        res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        return res.sendStatus(204)
    }

    existUser.refreshToken = '',
        await existUser.save()

    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.sendStatus(204);
}
module.exports = { logOutHandler }