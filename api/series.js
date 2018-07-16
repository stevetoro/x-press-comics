const express = require('express');
const seriesRouter = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

seriesRouter.get('/', (req, res, next) => {
  db.all(`SELECT * FROM Series`, (err, series) => {
    if (err) return next(err);
    return res.status(200).send({ series });
  });
});

module.exports = seriesRouter;