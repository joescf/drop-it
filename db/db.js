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
           (drop, latitude, longitude)
           VALUES
           ($1, $2, $3);`,
          [req.body.drop, req.body.latitude, req.body.longitude])
    .then( data => {
      console.log('Successfully added new entry');
      next();
    })
    .catch( error => {
      console.log('Error ', error);
    });
}


function deleteDrop(req,res,next) {
  console.log(req)
  db.any (`DELETE
           FROM drops
           WHERE drop_id=$1;`,[req.params.id])
    .then( data => {
           next();
    })
  .catch( error => {
      console.log('Error ', error);
    });
}


module.exports = { getAllDrops, addDrop, deleteDrop };
