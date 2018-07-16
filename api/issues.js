const express = require('express');
const issuesRouter = express.Router({ mergeParams: true });
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

issuesRouter.get('/', (req, res, next) => {
  db.all(`SELECT * FROM Issue WHERE Issue.series_id = ${req.params.seriesId}`, (err, issues) => {
    if (err) return next(err);
    return res.status(200).send({ issues });
  });
});

issuesRouter.post('/', (req, res, next) => {
  const { name, issue_number, publication_date, artist_id } = req.body.issue;
  if (!(name && issue_number && publication_date && artist_id)) return res.sendStatus(400);

  db.get(`SELECT * FROM Artist WHERE Artist.id = ${artist_id}`, (err, artist) => {
    if (err) return next(err);
    if (!artist) return res.sendStatus(400);

    db.run(
      `INSERT INTO Issue (name, issue_number, publication_date, artist_id, series_id)
      VALUES ($name, $issue_number, $publication_date, $artist_id, $series_id)`,
      {
        $name: name,
        $issue_number: issue_number,
        $publication_date: publication_date,
        $artist_id: artist_id,
        $series_id: req.params.seriesId
      },
      function (err) {
        if (err) return next(err);
        db.get(`SELECT * FROM Issue WHERE Issue.id = ${this.lastID}`, (err, issue) => {
          if (err) return next(err);
          return res.status(201).send({ issue });
        });
      })
  });
});

module.exports = issuesRouter;