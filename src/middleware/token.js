require('dotenv').config
const jwt = require('jsonwebtoken')
const User = require('../config/db')

const {
  jwtToken, jwtRefreshToken,
} = process.env

const checkToken = (req, res, next) => {
  const userToken = req.headers.authorization.split(' ')[1]
  if (jwtRefreshToken) {
    try {
      jwt.verify(userToken, jwtToken, async (err, decoded) => {
        try {
          if (err) throw new Error(err)

          console.log(decoded)

          const user = await User.find(decoded.id)
          if (!user || user.accessToken !== userToken) return res.sendStatus(403)

          req.body.id = decoded.id
          next()
        } catch (error) {
          if (error.message === 'TokenExpiredError: jwt expired') {
            return res.status(403).json({ message: 'TokenExpired' })
          }
          return res.sendStatus(500)
        }
      })
    } catch (e) {
      return res.sendStatus(500)
    }
  } else {
    return res.sendStatus(403)
  }
}

module.exports = {
  checkToken,
}
