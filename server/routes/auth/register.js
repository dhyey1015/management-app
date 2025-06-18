const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.send('Register route placeholder');
});

module.exports = router;