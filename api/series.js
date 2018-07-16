const express = require('express');
const seriesRouter = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

seriesRouter.param('seriesId', (req, res, next, seriesId) => {
  db.get(`SELECT * FROM Series WHERE Series.id = ${seriesId}`, (err, series) => {
    if (err) return next(err);
    if (series) {
      req.series = series;
      return next();
    }
    return res.sendStatus(404);
  })
});

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

seriesRouter.get('/:seriesId', (req, res, next) => {
  return res.status(200).send({ series: req.series });
});

seriesRouter.put('/:seriesId', (req, res, next) => {
  const { name, description } = req.body.series;
  if (!(name && description)) return res.sendStatus(400);

  db.run(`
    UPDATE Series SET name = $name,
      description = $description
    WHERE Series.id = ${req.params.seriesId}`,
    {
      $name: name,
      $description: description
    },
    function (err) {
      if (err) return next(err);
      db.get(`SELECT * FROM Series WHERE Series.id = ${req.params.seriesId}`, (err, series) => {
        if (err) return next(err);
        return res.status(200).send({ series });
      });
    }
  );
});

module.exports = seriesRouter;