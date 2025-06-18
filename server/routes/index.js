const express = require('express')
const authRoute = require('./auth/index')

const router = express.Router()

router.use('/auth', authRoute)

module.exports = router