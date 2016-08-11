const router = require('express').Router();
const { getAllDrops, addDrop, deleteDrop }  = require('../db/db');
const KEY            = process.env.GOOLGE_API;

router.get('/', function(req,res) {
  res.render('index', {KEY: KEY});
});


// router.delete('/drops/:id', deleteDrop, function(req, res) {
//   res.redirect('/');
// })

module.exports = router;
