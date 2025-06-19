import express from 'express';

const router = express.Router()


router.post('/login', async function(req, res){
    res.json({
        message: "hello"
    })
})

module.exports = router;