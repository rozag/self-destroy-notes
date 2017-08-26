"use strict";

const {Pool} = require('pg');
const express = require('express');
const router = express.Router();

router.put('/', (request, response) => {
    const text = request.body.text;
    const pool = new Pool();
    pool.connect((err, client, done) => {
        done();
        if (err) {
            console.error(err);
            response.send('Error: ' + err);
            throw err;
        }
        client.query(
            'INSERT INTO notes (text) VALUES ($1) RETURNING id',
            [text],
            (err, res) => {
                if (err) {
                    console.error(err);
                    response.send('Error: ' + err);
                }
                console.log(res);
                const row_id = res.rows[0].id;
                response.send({
                    id: row_id,
                    url: request.headers.host + '/notes/' + row_id
                });
            }
        );
    });
    pool.end();
});

router.get('/:id', (request, response) => {
    const note_id = request.params.id;
    const pool = new Pool();
    pool.connect((err, client, done) => {
        done();
        if (err) {
            console.error(err);
            response.send('Error: ' + err);
            throw err;
        }
        client.query(
            'SELECT text FROM notes WHERE id = $1;',
            [note_id],
            (err, res) => {
                if (err) {
                    console.error(err);
                    response.code = 410;
                    response.send('Error: ' + err);
                }
                const row = res.rows[0];
                console.log(row);
                client.query(
                    'DELETE FROM notes WHERE id = $1',
                    [note_id],
                    (err, res) => {
                        if (err) {
                            console.error(err);
                            response.send('Error: ' + err);
                        }
                        console.log(res);
                        if (row === undefined || row.text === undefined) {
                            response.code = 410;
                            response.send({error: 'No such note'});
                        } else {
                            response.send({text: row.text});
                        }
                    }
                );
            }
        );
    });
    pool.end();
});

module.exports = router;