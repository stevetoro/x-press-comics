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

seriesRouter.post('/', (req, res, next) => {
  const { name, description } = req.body.series;
  if (!(name && description)) return res.sendStatus(400);

  db.run(`
    INSERT INTO Series (name, description)
    VALUES ($name, $description)`,
    {
      $name: name,
      $description: description
    },
    function (err) {
      if (err) return next(err);
      db.get(`SELECT * FROM Series WHERE Series.id = ${this.lastID}`, (err, series) => {
        if (err) return next(err);
        return res.status(201).send({ series });
      });
    }
  );
});

module.exports = seriesRouter;