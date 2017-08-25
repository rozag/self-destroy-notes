const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
    const test = process.env.TEST || null;
    res.send(`respond with a user; TEST=${test}`);
});

module.exports = router;