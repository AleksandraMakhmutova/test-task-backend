require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../config/db')
const createToken = require('../helpers/token')
const { userDstructurization } = require('../helpers/user')

const {
  jwtToken, jwtRefreshToken,
} = process.env

const saltRounds = process.env.saltRounds ?? 10

const login = (req, res) => {
	const { name, pass } = req.body
  if (name && pass) {
    try {
			const user = User.map(el=> (el.login === name))
			console.log(user);
			const isValidPass = User.map(el=> (el.pass === pass))
			
      if (isValidPass) {
				req.session.user = {
					name,
			}
        const payload = { id: user._id }
        user.accessToken = createToken('access', payload)
        user.refreshToken = createToken('refresh', payload)
        return res.json(userDstructurization(user))
      }
      return res.sendStatus(401)
    } catch (error) {
      console.log('error',error)
      return res.sendStatus(500)
    }
  }
  return res.sendStatus(204)
}



const token = async (req, res) => {
  const { refreshToken } = req.body

  if (refreshToken) {
    try {
      jwt.verify(refreshToken, jwtRefreshToken, async (err, decoded) => {
        if (err) return res.sendStatus(403)

        const user = await User.findById(decoded.id)
        if (!user || user.refreshToken !== refreshToken) return res.sendStatus(403)

        const payload = { id: user._id }
        user.accessToken = createToken('access', payload)
        user.refreshToken = createToken('refresh', payload)

        user.save()
        return res.json(userDstructurization(user))
      })
    } catch (e) {
      return res.sendStatus(500)
    }
  } else {
    return res.sendStatus(401)
  }
}

const logout = (req, res) => {
	console.log("LOGOUT");
	console.log(localStorage);
window.localStorage.clear()
res.status(202).redirect('/')
}



module.exports = {
  login,
  token,
  logout,

}
