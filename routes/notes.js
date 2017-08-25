const express = require('express');
const router = express.Router();
const {Pool, Client} = require('pg');

router.put('/', (request, response) => {
    const text = request.body.text;
    // const client = new Client();
    // client.connect();
    // client.end();
    // res.send({id: text})
    const pool = new Pool();
    pool.query('SELECT NOW() as tm', (err, res) => {
        response.send(`text: ${text}, err: ${err}, res: ${res}`);
        pool.end();
    });
});

router.get('/', (req, res) => {
    const test = process.env.TEST || null;
    res.send(`respond with a user; TEST=${test}`);
});

module.exports = router;