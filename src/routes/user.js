const express = require('express')
const userController = require('../controllers/userController')
const tokenMiddleware = require('../middleware/token')

const router = express.Router()

router.post('/login', userController.login)

router.post('/logout', userController.logout)
router.post('/token', userController.token)


router.get('/info', tokenMiddleware.checkToken, userController.info)

module.exports = router
