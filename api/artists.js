const express = require('express');
const artistsRouter = express.Router();
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

artistsRouter.get('/', (req, res, next) => {
  db.all('SELECT * FROM Artist WHERE Artist.is_currently_employed = 1', (err, artists) => {
    if (err) return next(err);
    return res.status(200).send({ artists });
  });
});

artistsRouter.post('/', (req, res, next) => {
  const { name, date_of_birth, biography, is_currently_employed = 1 } = req.body.artist;
  if (!(name && date_of_birth && biography))
    return res.sendStatus(400);

  db.run(`
    INSERT INTO Artist (name, date_of_birth, biography, is_currently_employed)
    VALUES ($name, $date_of_birth, $biography, $is_currently_employed)`,
    {
      $name: name,
      $date_of_birth: date_of_birth,
      $biography: biography,
      $is_currently_employed: is_currently_employed
    },
    function (err) {
      if (err) return next(err);
      db.get(`SELECT * FROM Artist WHERE Artist.id = ${this.lastID}`, (err, artist) => {
        if (err) return next(err);
        return res.status(201).send({ artist });
      });
    }
  );
});

module.exports = artistsRouter;