const express = require('express')

const router = express.Router()


router.post('/login', async function(req, res){

    res.status(200).json({
        message: 'User created successfully',
    })
})

module.exports = router;