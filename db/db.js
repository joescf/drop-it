'use strict'
const pg       = require('pg-promise')({});

const pgConfig = {  host: process.env.PG_HOST,
                    port: process.env.PG_PORT,
                    database: 'drop_it',
                    user:process.env.PG_USER,
                    password: process.env.PG_PASSWORD };

const db       = pg(pgConfig);

function getAllDrops(req,res,next) {
  console.log('hi there');
  db.any(`SELECT * FROM drops`)
    .then( data => {
      res.rows = data;
      next();
    })
    .catch( error => {
      console.log('Error ',error);
    });
}

function addDrop(req,res,next) {
  console.log(req)
  db.none(`INSERT INTO drops
           (drop)
           VALUES
           ($1);`,
          [req.body.drop])
    .then( data => {
      console.log('Successfully added new entry');
      next();
    })
    .catch( error => {
      console.log('Error ', error);
    });
}

module.exports = { getAllDrops, addDrop };
