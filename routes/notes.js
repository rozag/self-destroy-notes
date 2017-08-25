const express = require('express');
const router = express.Router();
const {Pool, Client} = require('pg');

router.put('/', (req, res) => {
    const text = req.body.text;
    // const client = new Client();
    // client.connect();
    // client.end();
    // res.send({id: text})
    res.send(`env: ${process.env}`)
});

router.get('/', (req, res) => {
    const test = process.env.TEST || null;
    res.send(`respond with a user; TEST=${test}`);
});

module.exports = router;