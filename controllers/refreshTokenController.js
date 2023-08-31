const jwt = require('jsonwebtoken')
const User = require('../models/User')

const refreshTokenHandler = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401)

    //check refreshToken exist in database
    const existUser = await User.findOne({ refreshToken: cookies.jwt }).exec();
    if (!existUser) return res.sendStatus(403)

    jwt.verify(
        cookies.jwt,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || existUser.username !== decoded.username) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { "username": decoded.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1m' }
            )
            return res.json({ 'accessToken': accessToken });
        }
    )

}
module.exports = { refreshTokenHandler }