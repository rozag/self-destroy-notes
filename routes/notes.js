"use strict";

const express = require('express');
const router = express.Router();
const {Pool, Query} = require('pg');

router.put('/', (request, response) => {
    const text = request.body.text;
    const pool = new Pool();
    pool.on('error', (err) => {
        console.error('Unexpected error on idle client', err);
        process.exit(-1);
    });
    pool.connect((err, client, done) => {
        if (err) {
            throw err;
        }
        const query = client.query(new Query(
            'INSERT INTO notes (text) VALUES ($1) RETURNING id',
            [text]
        ));
        query.on('row', (row) => {
            console.log(row);
            response.send({
                id: row.id,
                url: request.headers.host + '/notes/' + row.id
            })
        });
        query.on('error', (err) => {
            console.log(err);
            response.error(err);
        });
        done();
    });
    pool.end();
});

router.get('/', (request, response) => {
    const test = process.env.TEST || null;
    response.send(`respond with a user; TEST=${test}`);
});

module.exports = router;